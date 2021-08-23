import * as PIXI from 'pixi.js'
import { Game } from '../gameView/Game'

const paddleHeight: number = 25,
      appWidth: number = 800,
      appHeight: number = window.innerHeight,
      ballWidth: number = 10

export class Ball {
    public ball: PIXI.Graphics
    public constructor () {
        this.ball = new PIXI.Graphics()
        this.ball.beginFill(0x24271D)
        this.ball.drawCircle((appWidth / 2) - (ballWidth / 2), (appHeight) - (paddleHeight + ballWidth), ballWidth)
        this.ball.endFill()
        Game.Stage.addChild(this.ball)
    }

}
