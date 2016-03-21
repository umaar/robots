
/*
	Instructions = 'L', 'R', 'F'
	robot = { x: 2, y:1, orientation: 'N' }
*/

const directions = {
	L: -90,
	R: 90
};

const points = {
	N: 0,
	E: 90,
	S: 180,
	W: 270
};

function handleRobotInstruction(robot, instruction) {
	const turn = 360;
	const cardinals = Object.keys(points);
	const directionCount = cardinals.length;
	const degrees = directions[instruction] + points[robot.orientation];
	let index = Math.round(((degrees % turn) / turn) * directionCount);

	// Handle the negative number case
	index = index < 0 ? index += directionCount : index;

	return {
		...robot,
		orientation: cardinals[index]
	};
}

module.exports = handleRobotInstruction;
