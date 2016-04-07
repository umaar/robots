var clone = require('lodash.clone');
/*

	grid = {
		xMax: 5,
		yMax: 3,
		xMin: 0,
		yMin: 0,
		scents: [
			{ x: 2, y: 1, orientation: 'N' }
		]
	}

	Add a todo() method here

*/

export function isValidMove(disallowedMoves = [], attempt) {
	return !disallowedMoves.some(({x, y, orientation}) => {
		return x === attempt.x &&
			y === attempt.y &&
			orientation === attempt.orientation;
	});
}

// module.exports = isValidMove;
