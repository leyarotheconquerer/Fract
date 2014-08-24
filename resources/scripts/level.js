var Fract.IntroLevel = function(game) { };

Fract.IntroLevel.prototype = {
	preload: function() {
		this.game.load.image("IntroCenterBackground", "resources/images/IntroBackground.png");
	},

	create: function() {
		this.game.stage.backgroundColor = "#ffffff";

		// Set up the world background
		this.game.world.setBounds(-2000, -2000, 4000, 4000);
		this.game.add.sprite(-512, -512, "IntroCenterBackground");

		// Initialize the game camera
		this.game.camera.setPosition(0, 0);
		this.game.camera.setBoundsToWorld();

		// Add some camera tracking text
		this.cameraDebug = this.game.add.bitmapText(10, 10, "FractFont", "Hello");
		this.cameraDebug.fixedToCamera = true;
		this.pointerDebug = this.game.add.bitmapText(10, 40, "FractFont", "Hello");
		this.pointerDebug.fixedToCamera = true;
	},

	update: function() {
		var pointer;

		// Get the pointer for convenience
		pointer = this.game.input.activePointer;

		this.cameraDebug.setText("CameraPos: (" + this.game.camera.view.centerX + ", " + this.game.camera.view.centerY + ")");
		this.pointerDebug.setText("PointerPos: (" + pointer.position.x + ", " + pointer.position.y + ")");

		// Follow the pointer with the camera
		if (pointer.isDown)
		{
			var debugText = this.pointerDebug.text;

			if (pointer.position.x < this.game.camera.width / 2 - 100)
			{
				debugText += "\nLeft(" + (this.game.camera.width / 2 - 100) + ")";
				this.game.camera.x -= 10;
			}
			else if (pointer.position.x > this.game.camera.width / 2 + 100)
			{
				debugText += "\nRight (" + (this.game.camera.width / 2 + 100) + ")";
				this.game.camera.x += 10;
			}

			if (pointer.position.y < this.game.camera.height / 2 - 100)
			{
				debugText += "\nUp(" + (this.game.camera.height / 2 - 100) + ")";
				this.game.camera.y -= 10;
			}
			else if (pointer.position.y > this.game.camera.height / 2 + 100)
			{
				debugText += "\nDown(" + (this.game.camera.height / 2 + 100) + ")";
				this.game.camera.y += 10;
			}

			this.pointerDebug.setText(debugText);
		}
	}
};
