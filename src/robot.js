
/*
	Instructions = 'L', 'R', 'F'
	robot = { x: 2, y:1, orientation: 'N' }
*/

import {isValidMove} from './grid';

const directions = {L: -90, R: 90};

const points = ['N', 'E', 'S', 'W'];

export function handleOrientation(currentOrientation, desiredOrientation) {
	const turn = 360;
	const directionCount = points.length;
	const currentDegrees = (points.indexOf(currentOrientation) * 360) / 4;
	const degrees = directions[desiredOrientation] + currentDegrees;
	let index = Math.round(((degrees % turn) / turn) * directionCount);

	// Handle the negative number case
	index = index < 0 ? index += directionCount : index;

	return points[index] || currentOrientation;
}

export function handlePosition({orientation, x, y}, movement) {
	if (movement === 'F') {
		if (orientation === 'N') {
			y++;
		}
		if (orientation === 'E') {
			x++;
		}
		if (orientation === 'S') {
			y--;
		}
		if (orientation === 'W') {
			x--;
		}
	}

	return {
		x, y
	};
}

export function isOutOfBounds(grid, x, y) {
	if (x > grid.xMax ||
		y > grid.yMax ||
		x < grid.xMin ||
		y < grid.yMin) {
		return true;
	}
}

export function handleRobotInstruction(robot, instruction = '', grid = {}) {
	return instruction.split('').reduce((robot, direction) => {
		if (robot.lostStatus === 'LOST') return robot;

		const orientation = handleOrientation(robot.orientation, direction);
		const {x, y} = handlePosition(robot, direction);
		let updatedRobot;

		if (!isOutOfBounds(grid, x, y)) {
			updatedRobot = Object.assign(robot, {x, y});
		} else if (isOutOfBounds(grid, x, y)) {
			if (isValidMove(grid.scents, robot)) {
				updatedRobot = Object.assign(robot, {lostStatus: 'LOST'});
			} else {
				updatedRobot = robot;
			}
		}

		return Object.assign({}, updatedRobot, {orientation});
	}, robot);
}

