import test from 'ava';

import robot from '../src/robot.js';

test('Robot instruction', t => {
	const handleRobotInstruction = robot.__get__('handleRobotInstruction');
	t.is(typeof handleRobotInstruction, 'function');

	const sampleRobot = {
		x: 2, y: 1, orientation: 'N'
	};

	const try1 = handleRobotInstruction(sampleRobot, 'L');
	t.same(try1, {x: 2, y: 1, orientation: 'W'});
});
