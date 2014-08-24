// Main.js

var Game = new Phaser.Game(
		800,600,
		Phaser.Canvas, "game",
		{
			preload: preload,
			create: create,
			update: update
		});

function preload() {
	// Load the resources for the title screen
	this.game.load.image("Title", "resources/images/title.png");
	this.game.load.bitmapFont("FractFont", "resources/images/font.png", "resources/images/font.xml");

	// Add the game states
	this.game.state.add("IntroLevel", IntroLevel);
}

function create() {
	this.add.sprite(0,0,"Title");

	this.thingies = {};
	this.thingies.text = this.add.bitmapText(180, 430, "FractFont", "Press Enter to Continue");
}

function update() {
	// If the user presses enter, then go to the first level
	if (this.game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) ||
			this.game.input.activePointer.justPressed())
	{
		this.game.state.start("IntroLevel");
	}
}
