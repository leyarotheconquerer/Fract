Fract.World = function(game, config) {
	this.game = game;
	this.config = config;
};

Fract.World.prototype = {
	create: function() {
		this.platforms = [];
		var i;
		for(i = 0; i < this.config.Platforms.length; i++)
		{
			console.log("Generating platform " + i + " of " + this.config.Platforms.length);
			this.platforms.push(this.placePlatform(this.config.Platforms[i]));
		}
	},

	update: function() {
	},

	placePlatform: function(platformInfo) {
		// Values to be calculated for each tile
		var xPos;
		var yPos;
		var tileRotation;
		
		// Intermediate values for tile value calculation
		var horizontalDelta = 0;
		var verticalDelta = 0;

		// Interpret the information from the config file
		var tileMap = platformInfo.TileMap;
		var tileSize = platformInfo.TileSize;
		var tiles = platformInfo.Tiles;
		var baseAngle = platformInfo.Angle;
		var radius = platformInfo.Radius;

		// Add a group to hold the new platform
		var platformGroup = this.game.add.group();
		var sprite;

		// Set the name of the platform for debug purposes
		platformGroup.name = platformInfo.Name;
		platformGroup.angles = [];
		platformGroup.ids = [];

		// Iterate through each tile, calculate its position, and place it
		var x;
		var y;
		// NOTE: Rotation takes the bottom right tile as the focal point of angle/radius
		radius += tileSize * tiles.length;
		for(y = 0; y < tiles.length; ++y)
		{
			for(x = tiles[y].length - 1; x >= 0; --x)
			{
				// Calculate the rotation of the tile (from 3:00 position, ergo -90)
				tileRotation = baseAngle + (180 * horizontalDelta) / (Math.PI * (radius));

				// Calculate the x and y position of the tile
				xPos = (radius - verticalDelta) * Math.cos(Math.radians(tileRotation));
				yPos = -1 * (radius - verticalDelta) * Math.sin(Math.radians(tileRotation)); // Flip y

				// Create a sprite as part of the platform group
				if (tiles[y][x].id != 8 && tiles[y][x].id != 12)
				{
					sprite = platformGroup.create(xPos, yPos, tileMap, tiles[y][x].id);
					sprite.anchor.setTo(0.5,0.5);
					platformGroup.angles.push(90 - tileRotation);
					platformGroup.ids.push(tiles[y][x].id);
				}

				horizontalDelta += tileSize;
			}

			verticalDelta += tileSize;

			horizontalDelta = 0;
		}

		// Add this tile group to the physics engine
		this.game.physics.p2.enable(platformGroup);

		this.j = 0;

		// Set the physical properties of each tile in the platform
		platformGroup.forEach(function(tile) {
			tile.body.static = true;
			tile.body.angle = platformGroup.angles[this.j];

			tile.body.clearShapes();
			if(!tile.body.loadPolygon("IntroTilesPhysics", "IntroTile" + platformGroup.ids[this.j++]))
			{
				console.log("Argh! Failed to load physics stuff!");
			}
		}, this);

		return platformGroup;
	}
};
