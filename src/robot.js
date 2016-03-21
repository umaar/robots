
/*
	Instructions = 'L', 'R', 'F'
	robot = { x: 2, y:1, orientation: 'N' }
*/

const directions = {L: -90, R: 90};

const points = ['N', 'E', 'S', 'W'];

function handleOrientation(currentOrientation, desiredOrientation) {
	const turn = 360;
	const directionCount = points.length;
	const currentDegrees = (points.indexOf(currentOrientation) * 360) / 4;
	const degrees = directions[desiredOrientation] + currentDegrees;
	let index = Math.round(((degrees % turn) / turn) * directionCount);

	// Handle the negative number case
	index = index < 0 ? index += directionCount : index;

	return points[index];
}

function handleRobotInstruction(robot, instruction = '') {
	return instruction.split('').reduce((robot, direction) => {
		const updatedOrientation = handleOrientation(robot.orientation, direction);

		robot.orientation = updatedOrientation;
		return robot;
	}, robot);
}

module.exports = handleRobotInstruction;
