import * as PIXI from 'pixi.js'

interface BomberFrames {
    front: string[];
    back: string[];
    right: string[];
    left:  string[];
}

export class GameApp {
    private app: PIXI.Application;
    constructor(
      width: number,
      height: number
    ) {
      this.app = new PIXI.Application({
        width,
        height,
        backgroundColor: 0x1099bb,
      });
      document.body.appendChild(this.app.view)

  
      // init Pixi loader
      let loader = new PIXI.Loader();
      // Add user player assets
      loader.add('paddle', "https://i.ibb.co/4PXHM7B/paddle.png")
      loader.load(this.onAsset.bind(this))
  
      // Load assets
    }

    private onAsset () {
        const playerIdle: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.from("https://i.ibb.co/4PXHM7B/paddle.png")) 
        playerIdle.width = 100

        playerIdle.x = 100
        playerIdle.y = 150
        this.app.stage.addChild(playerIdle);
    }
  }