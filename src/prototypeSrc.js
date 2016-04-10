import fs from 'fs';

function init() {
	const file = fs.readFileSync('./input.txt').toString();
	const [upperRightCoords, ...behaviour] = file.split('\n').filter(line => line.length !== 0);
	const [upperX, upperY] = upperRightCoords.split(' ').map(coord => parseInt(coord, 10));
	const positionAndInstruction = behaviour.reduce((previous, current, index, arr) => {
		if (index % 2 === 1) {
			const [x, y, orientation] = arr[index - 1].split(' ');
			previous.push({
				initialPosition: {
					x: parseInt(x, 10),
					y: parseInt(y, 10),
					orientation
				},
				instructions: current.split('')
			});
		}
		return previous;
	}, []);

	const grid = {
		minX: 0, minY: 0, maxX: upperX, maxY: upperY, scents: []
	};

	const orientationMappings = {
		L: {N: 'W', E: 'N', S: 'E', W: 'S'},
		R: {N: 'E', E: 'S', S: 'W', W: 'N'}
	};

	const movementMappings = {
		F: {N: {y: 1}, E: {x: 1}, S: {y: -1}, W: {x: -1}}
	};

	const results = positionAndInstruction.map(({initialPosition, instructions}) => {
		const robot = {
			x: initialPosition.x,
			y: initialPosition.y,
			orientation: initialPosition.orientation,
			lostStatus: ''
		};

		instructions.forEach(instruction => {
			if (robot.lostStatus === 'LOST') {
				return;
			}
			const currentRobotOrientation = robot.orientation;
			if (instruction === 'L' || instruction === 'R') {
				robot.orientation = orientationMappings[instruction][currentRobotOrientation];
			}

			if (instruction === 'F') {
				const x = movementMappings[instruction][currentRobotOrientation].x || 0;
				const y = movementMappings[instruction][currentRobotOrientation].y || 0;
				if ((robot.x + x) > grid.maxX || (robot.y + y) > grid.maxY) {
					const foundScent = grid.scents.filter(scent => {
						return scent.x === robot.x && scent.y === robot.y;
					}).length;
					if (foundScent) {
						// do nothing
					} else {
						robot.lostStatus = 'LOST';
						grid.scents.push({
							x: robot.x,
							y: robot.y,
							orientation: robot.orientation
						});
					}
				} else {
					robot.x += x;
					robot.y += y;
				}
			}
		});

		return robot;
	});

	results.forEach(robot => {
		console.log(robot.x, robot.y, robot.orientation, robot.lostStatus);
	});
}

module.exports = init;
