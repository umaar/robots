
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
	const degrees = directions[instruction] + points[robot.orientation];
	const index = Math.round(( (degrees % 360) / 360) * 4);

	robot.orientation = Object.keys(points)[index];
	return robot;
}

module.exports = handleRobotInstruction;
