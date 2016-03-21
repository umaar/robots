import test from 'ava';

import robot from '../src/robot.js';

test('Robot instruction', t => {
	const handleRobotInstruction = robot.__get__('handleRobotInstruction');
	t.is(typeof handleRobotInstruction, 'function');

	const try1 = handleRobotInstruction({x: 2, y: 1, orientation: 'E'}, 'R');
	t.same(try1, {x: 2, y: 1, orientation: 'S'});

	const try2 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'R');
	t.same(try2, {x: 2, y: 1, orientation: 'E'});

	const try3 = handleRobotInstruction({x: 2, y: 1, orientation: 'S'}, 'R');
	t.same(try3, {x: 2, y: 1, orientation: 'W'});

	const try4 = handleRobotInstruction({x: 2, y: 1, orientation: 'W'}, 'R');
	t.same(try4, {x: 2, y: 1, orientation: 'N'});
});
