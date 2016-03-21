import test from 'ava';

import robot from '../src/robot.js';

test('Robot instruction with a single direction', t => {
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

	const try5 = handleRobotInstruction({x: 2, y: 1, orientation: 'W'}, 'L');
	t.same(try5, {x: 2, y: 1, orientation: 'S'});

	const try6 = handleRobotInstruction({x: 2, y: 1, orientation: 'S'}, 'L');
	t.same(try6, {x: 2, y: 1, orientation: 'E'});

	const try7 = handleRobotInstruction({x: 2, y: 1, orientation: 'E'}, 'L');
	t.same(try7, {x: 2, y: 1, orientation: 'N'});

	const try8 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'L');
	t.same(try8, {x: 2, y: 1, orientation: 'W'});
});

test('Robot instruction with a many directions', t => {
	const handleRobotInstruction = robot.__get__('handleRobotInstruction');

	const try1 = handleRobotInstruction({x: 2, y: 1, orientation: 'E'}, 'RR');
	t.same(try1, {x: 2, y: 1, orientation: 'W'});
});
