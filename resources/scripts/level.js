Fract.IntroLevel = function(game) { };

Fract.IntroLevel.prototype = {
	preload: function() {
		this.game.time.advancedTiming = true;

		if (this.game.cache.checkImageKey("Loading"))
		{
			this.loadingScreen = this.game.add.sprite(0,0,"Loading");
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
		this.game.physics.p2.gravity.y = 400;

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

		// Update the level world
		this.levelWorld.update();

		// Update the player
		this.player.update();
	}
};
