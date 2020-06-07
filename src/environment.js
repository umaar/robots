export function setupEnvironment(data) {
	const [upperRightCoords, ...behaviour] = data.split('\n').filter(line => line.length !== 0);
	const [upperX, upperY] = upperRightCoords.split(' ').map(coord => Number.parseInt(coord, 10));
	const positionAndInstruction = behaviour.reduce((previous, current, index, array) => {
		if (index % 2 === 1) {
			const [x, y, orientation] = array[index - 1].split(' ');
			previous.push({
				initialPosition: {
					x: Number.parseInt(x, 10),
					y: Number.parseInt(y, 10),
					orientation
				},
				instructions: current
			});
		}

		return previous;
	}, []);

	const grid = {
		xMin: 0, yMin: 0, xMax: upperX, yMax: upperY, scents: []
	};

	return {grid, positionAndInstruction};
}
