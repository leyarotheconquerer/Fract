Fract.Player = function(game) {
	this.game = game;
};

Fract.Player.prototype = {
	create: function() {
		this.sprite = this.game.add.sprite(-200, -200, "Player");
		this.game.physics.enable(this.sprite, Phaser.Physics.Ninja);
	},

	update: function() {
	}
};
