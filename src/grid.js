export function isValidMove(attempt, disallowedMoves = []) {
	return !disallowedMoves.some(({x, y, orientation}) => {
		return x === attempt.x &&
			y === attempt.y &&
			orientation === attempt.orientation;
	});
}

export function applyGridScents(grid, {lostStatus, x, y, orientation}) {
	const updatedGrid = Object.assign({}, grid);
	if (lostStatus === 'LOST') {
		updatedGrid.scents.push({x, y, orientation});
	}

	return updatedGrid;
}
