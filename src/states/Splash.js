//Splash.js SplashState
//loads from Boot.js
//imports all assets
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
    init () {}

    //preload all assets
    preload () {
		game.stage.disableVisibilityChange = true;  // keeps everything running when the stage is no longer focused
		
        /*this.loadingBackground = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBackground');
        this.loaderBar = this.add.sprite(this.game.world.centerX-327, this.game.world.centerY+237, 'loadingBar');
        centerGameObjects([this.loadingBackground]);
        this.load.setPreloadSprite(this.loaderBar,0);*/
        
        //TODO: Load Images here
        game.load.image('background2', 'assets/images/background2.png');
        game.load.image('background', 'assets/images/background.png');
        game.load.image('ball', 'assets/images/ball.png');
        game.load.image('glasspaddle2', 'assets/images/glasspaddle2.png');
        game.load.image('blue', 'assets/images/blue.png');
        game.load.image('brown', 'assets/images/brown.png');
        game.load.image('green', 'assets/images/green.png');
        game.load.image('purple', 'assets/images/purple.png');
        game.load.image('red', 'assets/images/red.png');
        game.load.image('yellow', 'assets/images/yellow.png');
        game.load.image('brick', 'assets/images/brick.png');
        game.load.image('startButton', 'assets/images/startButton.png');
        game.load.image('button', 'assets/images/button.png');
        game.load.image('start', 'assets/images/start.png');
        game.load.image('Restart', 'assets/images/Restart.png');
        game.load.image('Restart2', 'assets/images/Restart2.png');
        

        // audio

        game.load.audio("hitBrickSound", "assets/audio/Laser Shot.wav");

        /////////////////
        // JSON Files 
        /////////////////
        //TODO: Load JSON files here
    }

    create () {
        this.state.start('Game');
    }
}
