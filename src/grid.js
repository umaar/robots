
/*

grid = {
	xMax: 5,
	yMax: 3,
	scents: [
		{ x: 2, y: 1, orientation: 'N' }
	]
}

*/

//TODO: Add scent

function isValidMove(disallowedMoves = [], attempt) {
	return !disallowedMoves.some(({x, y, orientation}) => {
		return x === attempt.x &&
			y === attempt.y &&
			orientation === attempt.orientation;
	});
}

module.exports = isValidMove;
