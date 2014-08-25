Fract.Player = function(game) {
	this.game = game;
	this.state = "fly";
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
		this.sprite.body.fixedRotation = true;
		this.sprite.body.damping = .75;

		// Add the player to the player collision group
		this.sprite.body.setCollisionGroup(this.game.playerGroup);
		this.sprite.body.collidesWith = [this.game.platformGroup, this.game.worldBoundGroup];

		// Add a callback for player collisions and break aways
		/*this.sprite.body.onBeginContact.add(function(body, shapeA, shapeB, equation) {
			if (this.game.physics.collisionGroups[shapeB.collisionGroup].mask == this.game.platformGroup.mask)
			{
				this.state = "move";
			}
		}, this);

		this.sprite.body.onEndContact.add(function(body, shapeA, shapeB, equation) {
			if (this.state == "move" &&
					this.game.physics.collisionGroups[shapeB.collisionGroup].mask == this.game.platformGroup.mask)
			{
				this.state = "fly";
			}
		}, this);*/

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
		if (pointer.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			// React according to the current player state
			switch(this.state)
			{
			case "fly":
				debugText += " Flying";
				//break;
			// Moving is the default state
			case "move":
			default:
				if (pointer.worldX < this.sprite.x)
				{
					debugText += " L";
					this.sprite.body.moveLeft(100);
				}
				else if (pointer.worldX > this.sprite.x)
				{
					debugText += " R";
					this.sprite.body.moveRight(100);
				}

				// Temporarily enable a jump
				if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
				{
					debugText += " J";
					this.sprite.body.moveUp(200);
				}

				break;
			}
		}
		this.debugText.setText(debugText);
	}
};
