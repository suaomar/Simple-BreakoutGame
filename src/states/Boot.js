//Boot.js BootState
//first to load
import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
    
    init () {
        this.stage.backgroundColor = '#FFFFFF'
        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)
    }

    preload () {
        game.stage.disableVisibilityChange = true; //keeps everything running when the stage is no longer focused
        //TODO: add in a font      
        WebFont.load({
            custom: {
                families: ['Riffic-Bold']
            },
            google: {
                families: ['Modak', 'Lato', 'Indie Flower']
            },
            active: this.fontsLoaded
        })
        
        this.fontsLoaded ();
    
        //TODO: 
        //this.load.image('loadingBackground', './assets/images/loadingBackground.png')
        //this.load.image('loadingBar', './assets/images/loadingBar.png')
    }

    
    create(){
        //this.loadingBackground = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBackground')
        //this.loadingBackground.anchor.setTo(0.5);
 
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically   = true;
        //screen size will be set automatically
        this.scale.updateLayout(true);
    }

    fontsLoaded () {
        this.fontsReady = true;
    }

    render () {
        if (this.fontsReady) {
            this.state.start('Splash');
        }
    } 
}
