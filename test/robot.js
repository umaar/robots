import test from 'ava';

import {handleRobotInstruction} from '../src/robot.js';

test('Robot instruction with a single direction', t => {
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
	const try1 = handleRobotInstruction({x: 2, y: 1, orientation: 'E'}, 'RR');
	t.same(try1, {x: 2, y: 1, orientation: 'W'});

	const try2 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'RRRR');
	t.same(try2, {x: 2, y: 1, orientation: 'N'});

	const try3 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'RLRLRLRLRLRLRLRLRL');
	t.same(try3, {x: 2, y: 1, orientation: 'N'});

	const try4 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'LLLL');
	t.same(try4, {x: 2, y: 1, orientation: 'N'});

	const try5 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, '');
	t.same(try5, {x: 2, y: 1, orientation: 'N'});
});

test('Robot can handle movement', t => {
	const try1 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'F');
	t.same(try1, {x: 2, y: 2, orientation: 'N'});

	const try2 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'FFF');
	t.same(try2, {x: 2, y: 4, orientation: 'N'});
});

test('Robot can get lost going over max', t => {
	const sampleGrid1 = {
		xMax: 5,
		yMax: 3,
		xMin: 0,
		yMin: 0
	};

	const sampleRobot1 = {
		x: 1,
		y: 1,
		orientation: 'N'
	};

	const {x, y, orientation, lostStatus} = handleRobotInstruction(sampleRobot1, 'FFF', sampleGrid1);
	t.is(x, 1);
	t.is(y, 3);
	t.is(orientation, 'N');
	t.is(lostStatus, 'LOST');
});

test('Robot can get lost going under the min', t => {
	const sampleGrid1 = {
		xMax: 5,
		yMax: 3,
		xMin: 0,
		yMin: 0
	};

	const sampleRobot1 = {
		x: 2,
		y: 2,
		orientation: 'N'
	};

	const {x, y, orientation, lostStatus} = handleRobotInstruction(sampleRobot1, 'LFFF', sampleGrid1);

	t.is(x, 0);
	t.is(y, 2);
	t.is(orientation, 'W');
	t.is(lostStatus, 'LOST');
});

test('Robot can handle movement and orientation', t => {
	const try1 = handleRobotInstruction({x: 1, y: 1, orientation: 'E'}, 'RFRFRFRF');
	t.same(try1, {x: 1, y: 1, orientation: 'E'});
});
