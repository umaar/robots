
import fs from 'fs';
import {handleRobotInstruction} from './robot';
import {applyGridScents} from './grid';

function start() {
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
				instructions: current
			});
		}
		return previous;
	}, []);

	let grid = {
		xMin: 0, yMin: 0, xMax: upperX, yMax: upperY, scents: []
	};

	const results = positionAndInstruction.map(({initialPosition, instructions}) => {
		const robot = {
			x: initialPosition.x,
			y: initialPosition.y,
			orientation: initialPosition.orientation,
			lostStatus: ''
		};

		const updatedRobot = handleRobotInstruction(robot, instructions, grid);

		if (updatedRobot.lostStatus === 'LOST') {
			grid = applyGridScents(grid, updatedRobot);
		}
		return updatedRobot;
	});

	results.map(({x, y, orientation, lostStatus}) => console.log(`${x} ${y} ${orientation} ${lostStatus ? 'LOST' : ''}`));
}

module.exports = start;
