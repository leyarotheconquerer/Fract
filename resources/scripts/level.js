Fract.IntroLevel = function(game) { };

Fract.IntroLevel.prototype = {
	preload: function() {
		this.game.time.advancedTiming = true;

		if (this.game.cache.checkImageKey("Title"))
		{
			//this.loadingScreen = this.game.add.sprite(0,0,"Title");
		}

		if (this.game.cache.checkBitmapFontKey("FractFont"))
		{
			console.log("there should be text");
			this.loadingText = this.game.add.bitmapText(200, 430, "FractFont", "Loading");
		}

		this.game.load.image("IntroCenterBackground", "resources/images/IntroBackground.png");

		// Load the intro level world
		this.game.load.spritesheet("IntroTiles", "resources/images/IntroTiles.png", 128, 128);
		this.game.load.physics("IntroTilesPhysics", "resources/images/IntroTilesPhysics.json");
		this.game.load.json("IntroLevelWorld", "resources/config/IntroLevelWorld.json");

		// Load the player
		this.game.load.spritesheet("Player", "resources/images/Player.png", 128, 128);
		this.game.load.physics("PlayerPhysics", "resources/images/PlayerPhysics.json");
	},

	create: function() {
		var playerPlatformContact;

		this.game.stage.backgroundColor = "#ffffff";

		// Set up the physics system
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.gravity.y = 200;

		// Create material types
		this.game.platformMaterial = this.game.physics.p2.createMaterial("Platform");
		this.game.playerMaterial = this.game.physics.p2.createMaterial("Player");
		this.game.worldBoundMaterial = this.game.physics.p2.createMaterial("WorldBounds");

		// Create collision groups
		this.game.platformGroup = this.game.physics.p2.createCollisionGroup();
		this.game.playerGroup = this.game.physics.p2.createCollisionGroup();
		this.game.worldBoundGroup = this.game.physics.p2.createCollisionGroup();
		this.game.physics.p2.updateBoundsCollisionGroup();

		// Create contact materials
		playerPlatformContact = this.game.physics.p2.createContactMaterial(this.game.platformMaterial, this.game.playerMaterial);

		playerPlatformContact.friction = .7;
		playerPlatformContact.restitution = 1.0;
		playerPlatformContact.stiffness = 1e7;
		playerPlatformContact.relaxation = 3;
		playerPlatformContact.frictionStiffness = 1e7;
		playerPlatformContact.frictionRelaxation = 3;
		playerPlatformContact.surfaceVelocity = 0.0;

		// Set up the world background
		this.game.world.setBounds(-2000, -2000, 4000, 4000);
		this.game.add.sprite(-512, -512, "IntroCenterBackground");

		// Create the level world
		this.levelWorld = new Fract.World(this.game, this.game.cache.getJSON("IntroLevelWorld"));
		this.levelWorld.create();

		// Create the player
		this.player = new Fract.Player(this.game);
		this.player.create();

		// Initialize the game camera
		this.game.camera.setPosition(0, 0);
		this.game.camera.setBoundsToWorld();

		// Add some camera tracking text
		this.cameraDebug = this.game.add.bitmapText(10, 10, "FractFont", "Hello");
		this.cameraDebug.fixedToCamera = true;
		this.pointerDebug = this.game.add.bitmapText(10, 40, "FractFont", "Hello");
		this.pointerDebug.fixedToCamera = true;
		this.fpsDebug = this.game.add.bitmapText(10, 100, "FractFont", "FPS: (" + this.game.time.fpsMin + "-" + this.game.time.fpsMax + ")");
		this.fpsDebug.fixedToCamera = true;

		// Get rid of the loading indicators
		this.loadingScreen.destroy();
		this.loadingText.destroy();

	},

	update: function() {
		var pointer;

		// Get the pointer for convenience
		pointer = this.game.input.activePointer;

		// Update Debug text
		this.cameraDebug.setText("Camera: (" + this.game.camera.view.centerX + ", " + this.game.camera.view.centerY + ")");
		this.pointerDebug.setText("Pointer: (" + pointer.position.x + ", " + pointer.position.y + ")");
		this.fpsDebug.setText("FPS: (" + this.game.time.fpsMin + "-" + this.game.time.fpsMax + ")");

		// Follow the pointer with the camera
		/*if (pointer.isDown)
		{
			var debugText = this.pointerDebug.text;

			if (pointer.position.x < this.game.camera.width / 2 - 100)
			{
				debugText += " L";
				this.game.camera.x -= 10;
			}
			else if (pointer.position.x > this.game.camera.width / 2 + 100)
			{
				debugText += " R";
				this.game.camera.x += 10;
			}

			if (pointer.position.y < this.game.camera.height / 2 - 100)
			{
				debugText += " U";
				this.game.camera.y -= 10;
			}
			else if (pointer.position.y > this.game.camera.height / 2 + 100)
			{
				debugText += " D";
				this.game.camera.y += 10;
			}

			this.pointerDebug.setText(debugText);
		}*/

		// Update the level world
		this.levelWorld.update();

		// Update the player
		this.player.update();

		// Check the player collision against the world
		this.levelWorld.collideAgainstPlatforms(this.player.sprite);
	}
};
