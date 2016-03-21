
/*
	Instructions = 'L', 'R', 'F'
	robot = { x: 2, y:1, orientation: 'N' }
*/

const directions = { L: -90, R: 90 };

const points = ['N', 'E', 'S', 'W'];

function handleRobotInstruction(robot, instruction='') {
	//instruction.split().map
	const turn = 360;
	const directionCount = points.length;
	const currentDegrees = (points.indexOf(robot.orientation) * 360) / 4;
	const degrees = directions[instruction] + currentDegrees;
	let index = Math.round(((degrees % turn) / turn) * directionCount);

	// Handle the negative number case
	index = index < 0 ? index += directionCount : index;

	return {
		...robot,
		orientation: points[index]
	};
}

module.exports = handleRobotInstruction;
