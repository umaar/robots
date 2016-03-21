
/*
Instructions = 'L', 'R', 'F'
robot = { x: 2, y:1, orientation: 'N' }
*/

const directions = {
	'L': -90,
	'R': 90
};

const points = {
	'N': 0,
	'E': 90,
	'S': 180,
	'W': 270
};

function handleRobotInstruction(robot, instruction) {
	let pointsLength = Object.keys(points).length;
	const degrees = directions[instruction] + points[robot.orientation];
	let index = Math.round(( (degrees % 360) / 360) * pointsLength);

	// Handle the negative num case
	index = index < 0 ? index += pointsLength : index;

	robot.orientation = Object.keys(points)[index];
	return robot;
}

module.exports = handleRobotInstruction;
