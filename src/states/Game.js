//Game.js GameState
//The Main Game Loop

import Phaser from 'phaser'

var ball;
var paddle;

var bricksgroup;
var bricks;
var storeBricks;

var scoreText;
var score = 0;

var lives = 3;
var livesText;


// start button
 var playing = false;
 var startButton;

// audio 
var hitBrickSound;
 

var gameOverFontStyle = {font: "Modak", fontSize: "50px", fill:"#ff0000"}; //white
var gameTextFontStyle = {font: "Indie Flower", fontSize: "50px", fill:"#ff0000"}; //white


export default class extends Phaser.State {
	// Very first function called in the state.
	init () {}

	// Called after init(). Use for loading assets. Do not create objects in this function.
	preload () {
		game.stage.disableVisibilityChange = true;  // keeps everything running when the stage is no longer focused
		 score = 0;
		 lives = 3;
		 playing= false;

	}

	// Called immediately after preload() is completed. 
	create () {
		var bg = game.add.tileSprite(0,0,800,600, "background");
		bg.fixedToCamera = true;

		//add physics to ball so gravity moves it down
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//collision not possible on the bottom part of screen
		game.physics.arcade.checkCollision.down = false;

		ball = game.add.sprite(game.world.width/2, game.world.height-25, 'ball');
		ball.scale.x = 0.50;
		ball.scale.y = 0.50;
		ball.anchor.set(0.5);
		game.physics.enable(ball,Phaser.Physics.ARCADE);
		//ball.body.velocity.set(150, -150);
		
		//bouncing off the walls
		ball.body.collideWorldBounds = true;
		ball.body.bounce.set(1);

		//not bouncing off the bottom wall

		ball.checkWorldBounds = true;
		
		ball.events.onOutOfBounds.add(this.ballLeaveScreen, this);


		//paddle 
		paddle = game.add.sprite(game.world.width/2, game.world.height-5, 'glasspaddle2');
		paddle.scale.x = 0.50;
		paddle.scale.y = 0.50;
		paddle.anchor.set(0.5);

		//physics for paddle so it hits the ball
		game.physics.enable(paddle,Phaser.Physics.ARCADE);

		paddle.body.immovable =true;

		

		this.initializeBricks();


		
		
		
		livesText = game.add.text(game.world.width - 220 , game.world.height - 570, 'Lives: '+ lives, gameTextFontStyle);
		livesText.scale.x = 0.50;
		livesText.scale.y = 0.70;
		livesText.anchor.setTo(0.5);

		scoreText = game.add.text(game.world.width -650, game.world.height -570, 'points: 0' , gameTextFontStyle);
		scoreText.scale.x = 0.50;
		scoreText.scale.y = 0.70;
		scoreText.anchor.setTo(0.5);

		
		

		//start button
		startButton = game.add.button(game.world.width/2, game.world.height/2, 'start', this.startGame, this, 1, 0, 2);
		startButton.anchor.set(0.5);
		
		//replay button
		//var replayButton = game.add.button(game.world.width/2, game.world.height/2, "Restart", this.gameOverLost, this, 0);
		//replayButton.anchor.setTo(0.5);
		

		// music
		hitBrickSound = game.add.sound("hitBrickSound");



	}
	
	
	// Updates and redraws your game. Called every frame.
	update () {
		//enable collision between ball and paddle
		game.physics.arcade.collide(ball,paddle ,this.ballHitPaddle);
		
		game.physics.arcade.collide(ball, bricksgroup, this.ballHitBrick); //or bricksgroup

		if (playing){
			paddle.x = game.input.x || game.world.width * 0.5;
		

		}

		if(score === storeBricks.count.row*storeBricks.count.col*1) {
			playing = false;
			ball.body.velocity.set(0, 0);
		var replayButton2 = game.add.button(game.world.width/2, game.world.height/2, "Restart2", this.replay, this, 0);
		replayButton2.anchor.setTo(0.5);

		var replayText2 = game.add.text(replayButton2.x , replayButton2.y  , "You Won!", gameOverFontStyle);
		replayText2.anchor.setTo(0.5);
	

	}
}
	
	
	initializeBricks(){
		storeBricks= {
			width: 80,
			heigh: 50,
			count: {
				row: 3,
				col: 7
			},
			offset:{
				top: 10,
				left: 60
			},
			padding: 30
		}

		bricksgroup = game.add.group();
		// loop through cols and rows to create new bricks
		for( var cols=0; cols < storeBricks.count.col; cols++) {
			for( var rows=0; rows < storeBricks.count.row; rows++) {
		//create new brick and add to group
			var brickX = (cols * (90  + storeBricks.padding)) + storeBricks.offset.left;
			var brickY = (rows * (70  + storeBricks.padding)) + storeBricks.offset.top + 80;
			bricks = game.add.sprite(brickX, brickY, 'yellow');
			game.physics.enable(bricks, Phaser.Physics.ARCADE);
			bricks.body.immovable = true;
			bricks.scale.x = 0.20;
			bricks.scale.y = 0.25;
			bricks.anchor.set(0.5);
			bricksgroup.add(bricks);
			}
		}
	}
	
	

	ballHitBrick(ball, brick) {
		
		hitBrickSound.play();

		
		var destroyTween = game.add.tween(brick.scale);
		destroyTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
		destroyTween.onComplete.addOnce(function(){
			brick.destroy();
		}, this);
		destroyTween.start();

		score += 1;
		scoreText.setText('Points: '+score);
		//scoreText = "points:"  + score;
		
		
		
}

	ballLeaveScreen() {
	lives--;
		if(lives) { 
		   livesText.setText('Lives: '+ lives);
			ball.body.velocity.set(250, -250);
			ball.reset(game.world.width /2 , game.world.height-25);
			paddle.reset(game.world.width/2, game.world.height-5);
			
			game.input.onDown.addOnce(function(){
				ball.body.velocity.set(250, -250);
			}, this);
		}
		else {
			
		var replayButton = game.add.button(game.world.width/2, game.world.height/2, "Restart", this.replay, this, 0);
		replayButton.anchor.setTo(0.5);

		var replayText = game.add.text(replayButton.x , replayButton.y  , "Game lost Replay", gameOverFontStyle);
		replayText.anchor.setTo(0.5);
		
		}	
	}

	  ballHitPaddle(ball, paddle){
		ball.body.velocity.x = -1 * 5 *(paddle.x-ball.x);
	  }

	startGame() {
		startButton.destroy();
		ball.body.velocity.set(250, -250);
		playing = true;
	}
	
	

	replay(){

		//var replayButton = game.add.button(game.world.width/2, game.world.height/2, "Restart", this.replay, this, 0);
		//replayButton.anchor.setTo(0.5);

		this.state.start('Game');

	}

}
