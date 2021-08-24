import * as PIXI from 'pixi.js'
import { Game } from '../gameView/Game'

const appWidth: number = 800,
    paddleWidth: number = 150,  
    paddleHeight: number = 25

export class Paddle{
    public paddle: PIXI.Sprite
    constructor(
        public txtr: any, 
        public posX: number,
        public posY: number,
    ) {
        this.paddle = new PIXI.Sprite(txtr)
        this.paddle.width = paddleWidth
        this.paddle.height = paddleHeight
        this.paddle.position.set(posX, posY)
        Game.Stage.addChild(this.paddle)
    }   

    public ObjectCollision = (ball: PIXI.Graphics): boolean => {
        let aBox = ball.getBounds()
        let bBox = this.paddle.getBounds()
        
        return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width &&
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height
    }

    public Moving = (e?: any): void => {
        let posX = e.data.global.x
        
        this.paddle.position.x = posX - this.paddle.width / 2
        if (this.paddle.position.x < 0) {
            this.paddle.position.x = 0
        }
        else if (this.paddle.position.x > (appWidth - this.paddle.width)) {
            this.paddle.position.x = appWidth - this.paddle.width
        }
    }
}