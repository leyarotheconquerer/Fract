// Initialize the Fract namespace.
var Fract = {};

// Add some utility functions to the Math library
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
};
