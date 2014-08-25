Fract.Player = function(game) {
	this.game = game;
	this.state = "move";
};

Fract.Player.prototype = {
	create: function() {
		this.sprite = this.game.add.sprite(200, 200, "Player", 0);
		this.sprite.name = "Player";

		// Add the physics of the player
		this.game.physics.p2.enable(this.sprite, true);

		// Load the physics hull
		this.sprite.body.clearShapes();
		this.sprite.body.loadPolygon("PlayerPhysics", "Player");

		// Refine physics parameters
		//this.sprite.body.fixedRotation = true; // Turn off for some fun!!!
		this.sprite.body.damping = .75;

		// Add some player tracking text
		this.debugText = this.game.add.bitmapText(10, 70, "FractFont", "");
		this.debugText.fixedToCamera = true;

		// Follow the player
		this.game.camera.follow(this.sprite);
	},

	update: function() {
		// Get the pointer for convenience
		var pointer = this.game.input.activePointer;

		var debugText = "Player: (" + Math.floor(this.sprite.x)+ ", " + Math.floor(this.sprite.y)+ ")";

		// Listen for input from the player
		if (pointer.isDown ||
				this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
				this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
				this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			// React according to the current player state
			switch(this.state)
			{
			// Moving is the default state
			case "move":
			default:
				if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
				{
					debugText += " L";
					this.sprite.body.moveLeft(300);
				}
				else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
				{
					debugText += " R";
					this.sprite.body.moveRight(300);
				}
				else if (pointer.worldX < this.sprite.x)
				{
					debugText += " L";
					this.sprite.body.moveLeft(300);
				}
				else if (pointer.worldX > this.sprite.x)
				{
					debugText += " R";
					this.sprite.body.moveRight(300);
				}

				// Temporarily enable a jump
				if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
				{
					debugText += " J";
					this.sprite.body.moveUp(500);
				}

				break;
			}
		}
		this.debugText.setText(debugText);
	}
};
