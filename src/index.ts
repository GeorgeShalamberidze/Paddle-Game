import { Paddle } from "./spriteObjects/Paddle";
import * as PIXI from 'pixi.js'
import { Game } from './gameView/Game'
import './styling/index.css'
import { GameApp } from "./gameView/gameApp";

// RECTANGLE HITTING FUNCTION
// const objectCollision = (a:any, b: any) => {
//     let aBox = a.getBounds()
//     let bBox = b.getBounds()

//     return aBox.x + aBox.width > bBox.x &&
//             aBox.x < bBox.x + bBox.width &&
//             aBox.y + aBox.height > bBox.y &&
//             aBox.y < bBox.y + bBox.height
// }

// Aliases
const Application = PIXI.Application,
      Text = PIXI.Text,
      TextStyle = PIXI.TextStyle,
      Graphics = PIXI.Graphics,
      Sprite = PIXI.Sprite

let topPaddle: PIXI.Sprite, 
    bottomPaddle: PIXI.Sprite, 
    ball: PIXI.Graphics,
    currentScoreText: PIXI.Text,
    finalScoreText: PIXI.Text,
    xSpeed: number = Math.floor(Math.random() * 8 - 4),
    ySpeed: number = 4,
    score: number = 0
      
//Constants
const paddleWidth: number = 150,
      paddleHeight: number = 25,
      appWidth: number = 800,
      appHeight: number = window.innerHeight,
      ballWidth: number = 10,
      style = new TextStyle({
            fontFamily: 'Roboto',
            fill: ['#000'],
            fontSize: 32,
            fontWeight: "bold"
    })

    

// const setup = (): void => {

//     app.stage.interactive = true

//     // Apply mouse event on canvas
//         let a = 0
//         const body = document.querySelector('body')!
//         body.addEventListener('click', () => {
//             a++
//             if (a > 1) {
//                 return
//             }
//             app.stage.on('pointermove', moving)
//             app.ticker.add(move);
//         })
// }
//     // Load Resources
// app.loader
//     .add("paddle", "https://i.ibb.co/4PXHM7B/paddle.png")
//     .load(setup)

const game = new Game()