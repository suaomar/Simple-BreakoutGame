import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
    constructor () {
        const docElement = document.documentElement
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

        super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', {resize:function(){
            
             var scaleX, scaleY, scale, center;
            var canvas = document.canvas;      
            //1. Scale the canvas to the correct size
            //Figure out the scale amount on each axis
            scaleX = window.innerWidth / canvas.width;
            scaleY = window.innerHeight / canvas.height;
            //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
            scale = Math.min(scaleX, scaleY);
            canvas.style.transformOrigin = "0 0";
            canvas.style.transform = "scale(" + scale + ")";
            //2. Center the canvas.
            //Decide whether to center the canvas vertically or horizontally.
            //Wide canvases should be centered vertically, and 
            //square or tall canvases should be centered horizontally
            if (canvas.width > canvas.height) {  
                center = "vertically";
            } else {  
                center = "horizontally";
            }
            //Center horizontally (for square or tall canvases)
            if (center === "horizontally") {  
                var margin = (window.innerWidth - canvas.width * scaleY) / 2;  
                canvas.style.marginLeft = margin + "px";  
                canvas.style.marginRight = margin + "px";
            }//Center vertically (for wide canvases) 
            if (center === "vertically") {  
                var margin = (window.innerHeight - canvas.height * scaleX) / 2;
                canvas.style.marginTop = margin + "px";
                canvas.style.marginBottom = margin + "px";
            }//3. Remove any padding from the canvas and set the canvas//display style to "block"
            canvas.style.paddingLeft = 0;canvas.style.paddingRight = 0;canvas.style.display = "block";
            ScaleManager.signalSizeChange();
            
        }})

        this.state.add('Boot', BootState, false)
        this.state.add('Splash', SplashState, false)
        this.state.add('Game', GameState, false)

        this.state.start('Boot')
    }
}

window.game = new Game()