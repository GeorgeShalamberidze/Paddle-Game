import * as PIXI from 'pixi.js'
import { Ball } from '../spriteObjects/Ball'
import { Paddle } from '../spriteObjects/Paddle'

const paddleWidth: number = 150,
      paddleHeight: number = 25,
      appWidth: number = 800,
      appHeight: number = window.innerHeight,
      ballWidth: number = 10,
      style = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fill: ['#000'],
            fontSize: 32,
            fontWeight: "bold"
    })
type Player = Paddle
const body = document.querySelector('body')!

let xSpeed: number = Math.floor(Math.random() * 8 - 4),
    ySpeed: number = 4,
    score: number = 0,
    topPaddle: Paddle,
    bottomPaddle: Paddle,
    ball: Ball,
    frames: any

export class Game{
    public app: PIXI.Application
    static Stage: PIXI.Container
    static App: PIXI.Application
    static TOP: Paddle
    static BOTTOM: Paddle
    static score: number
    static FinalScoreText: PIXI.Text
    static CurrentScoreText: PIXI.Text = new PIXI.Text(`${score}`, style)
    static ActiveEntities: Array<Player> = []

    constructor() {
    this.app = new PIXI.Application({
        width : appWidth,
        height: appHeight,
        backgroundColor: 0x1099bb,
        backgroundAlpha: .5,
        resolution: 1,
        antialias: true
    })
    document.body.appendChild(this.app.view)
    // CONSTANTS
    Game.Stage = this.app.stage
    Game.App = this.app

    Game.App.loader
        .add("https://i.ibb.co/4PXHM7B/paddle.png")
        .load(Game.setup.bind(this))

    }

    static setup(): void {
        // Top Paddle
        const texture = PIXI.Texture.from("https://i.postimg.cc/7PB6Tq0D/paddle.png")
        topPaddle = new Paddle(texture, (appWidth / 2) - (paddleWidth / 2), 0, paddleWidth, paddleHeight)

        // Bottom Paddle
        bottomPaddle = new Paddle(texture, (appWidth / 2) - (paddleWidth / 2), (appHeight) - paddleHeight, paddleWidth, paddleHeight)

        // BALL
        ball = new Ball()
        // Current Score Text
        Game.CurrentScoreText.x = 5

        // Final Score Text
        Game.FinalScoreText = new PIXI.Text(`You Scored ${score} Points !!!`, {...style, fontSize: 40})
        Game.FinalScoreText.x = appWidth / 2 - Game.FinalScoreText.width / 2
        Game.FinalScoreText.y = appHeight / 2 - Game.FinalScoreText.height / 2

        Game.Stage.addChild(Game.CurrentScoreText)
        Game.Stage.interactive = true

        let a = 0
        body.addEventListener('click', () => {
            a++
            if (a > 1) {
                return
            }
            Game.App.ticker.add(Game.Move)
            Game.Stage
            .on('pointermove', topPaddle.Moving)
            .on('pointermove', bottomPaddle.Moving)
        })
    }

    static Edges = ():void => {
        if (ball.ball.getBounds().x < 0 || ball.ball.getBounds().x > appWidth - (ballWidth * 2 )){
            xSpeed *= -1
        }
    }
    static OutOfBoundsReset = (): void => {
        if (ball.ball.getBounds().y < 0 || ball.ball.getBounds().y > appHeight - ball.ball.width){
            Game.Stage
                .off('pointermove', topPaddle.Moving)
                .off('pointermove', bottomPaddle.Moving)
            xSpeed = 0
            ySpeed = 0
            Game.FinalScoreText.text = `You Scored ${score} Points !!!`
            Game.Stage.addChild(Game.FinalScoreText)
    
            setInterval(() => {
                Game.Stage.removeChild(Game.FinalScoreText)
                window.location.reload()
            }, 3000)
        }
    }

    static Move() {
        let randomXDirection = Math.floor(Math.random() * 10 - 5)
        if (topPaddle.ObjectCollision(ball.ball)) {
            // give 50 to 50 probability of left/right rebound
            xSpeed = randomXDirection
            ySpeed = ySpeed < 0 ? ySpeed : ySpeed * -1
            score++
            Game.CurrentScoreText.text = score.toString()
            ySpeed -= 0.75
        }
        else if (bottomPaddle.ObjectCollision(ball.ball)) {
            xSpeed = randomXDirection
            ySpeed = ySpeed  < 0 ? ySpeed * -1 : ySpeed
            score++
            Game.CurrentScoreText.text = score.toString()
            ySpeed += 0.75
        }
        ball.ball.y -= ySpeed
        ball.ball.x += xSpeed
        Game.Edges()
        Game.OutOfBoundsReset()
    }
}