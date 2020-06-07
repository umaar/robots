import fs from 'fs';

import {handleRobotInstruction} from './robot.js';
import {applyGridScents} from './grid.js';
import {setupEnvironment} from './environment.js';

function start() {
	const fileContents = fs.readFileSync('./input.txt').toString();
	const {grid, positionAndInstruction} = setupEnvironment(fileContents);

	const results = positionAndInstruction.map(({initialPosition, instructions}) => {
		const robot = {
			x: initialPosition.x,
			y: initialPosition.y,
			orientation: initialPosition.orientation,
			lostStatus: ''
		};

		const updatedRobot = handleRobotInstruction(robot, instructions, grid);

		if (updatedRobot.lostStatus === 'LOST') {
			applyGridScents(grid, updatedRobot);
		}

		return updatedRobot;
	});

	results.map(({x, y, orientation, lostStatus}) => console.log(`${x} ${y} ${orientation} ${lostStatus ? 'LOST' : ''}`));
}

start();
