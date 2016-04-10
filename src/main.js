
import fs from 'fs';
import {handleRobotInstruction} from './robot';
import {applyGridScents} from './grid';
import {setupEnvironment} from './environment';

function start() {
	const fileContents = fs.readFileSync('./input.txt').toString();
	const env = setupEnvironment(fileContents);
	const positionAndInstruction = env.positionAndInstruction;
	let grid = env.grid;

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
