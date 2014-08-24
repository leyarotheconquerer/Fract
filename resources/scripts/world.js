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

				/*console.log("Tile (" + x + ", " + y + "):");
				console.log("   rot:" + tileRotation + " = theta:-" + baseAngle + " - 180 * del:" + horizontalDelta + " / (rad:" + radius + " * Math.PI) + 90");
				console.log("   x:" + xPos + " = (rad:" + radius + " + del:" + verticalDelta + ") * cos(beta:" + tileRotation + ")");
				console.log("   y:" + yPos + " = -1 * (rad:" + radius + " + del:" + verticalDelta + ") * sin(beta:" + tileRotation + ")");*/

				// Create a sprite as part of the platform group
				if (tiles[y][x].id != 8 || tiles[y][x].id != 12)
				{
					sprite = platformGroup.create(xPos, yPos, tileMap, tiles[y][x].id);
					sprite.anchor.setTo(0.5,0.5);
					sprite.angle = 90 - tileRotation;
				}

				horizontalDelta += tileSize;
			}

			verticalDelta += tileSize;

			horizontalDelta = 0;
		}

		return platformGroup;
	}
};
