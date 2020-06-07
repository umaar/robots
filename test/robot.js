import test from 'ava';

import {handleRobotInstruction} from '../src/robot.js';

test('Robot instruction with a single direction', t => {
	t.is(typeof handleRobotInstruction, 'function');

	const try1 = handleRobotInstruction({x: 2, y: 1, orientation: 'E'}, 'R');
	t.deepEqual(try1, {x: 2, y: 1, orientation: 'S'});

	const try2 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'R');
	t.deepEqual(try2, {x: 2, y: 1, orientation: 'E'});

	const try3 = handleRobotInstruction({x: 2, y: 1, orientation: 'S'}, 'R');
	t.deepEqual(try3, {x: 2, y: 1, orientation: 'W'});

	const try4 = handleRobotInstruction({x: 2, y: 1, orientation: 'W'}, 'R');
	t.deepEqual(try4, {x: 2, y: 1, orientation: 'N'});

	const try5 = handleRobotInstruction({x: 2, y: 1, orientation: 'W'}, 'L');
	t.deepEqual(try5, {x: 2, y: 1, orientation: 'S'});

	const try6 = handleRobotInstruction({x: 2, y: 1, orientation: 'S'}, 'L');
	t.deepEqual(try6, {x: 2, y: 1, orientation: 'E'});

	const try7 = handleRobotInstruction({x: 2, y: 1, orientation: 'E'}, 'L');
	t.deepEqual(try7, {x: 2, y: 1, orientation: 'N'});

	const try8 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'L');
	t.deepEqual(try8, {x: 2, y: 1, orientation: 'W'});
});

test('Robot instruction with a many directions', t => {
	const try1 = handleRobotInstruction({x: 2, y: 1, orientation: 'E'}, 'RR');
	t.deepEqual(try1, {x: 2, y: 1, orientation: 'W'});

	const try2 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'RRRR');
	t.deepEqual(try2, {x: 2, y: 1, orientation: 'N'});

	const try3 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'RLRLRLRLRLRLRLRLRL');
	t.deepEqual(try3, {x: 2, y: 1, orientation: 'N'});

	const try4 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'LLLL');
	t.deepEqual(try4, {x: 2, y: 1, orientation: 'N'});

	const try5 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, '');
	t.deepEqual(try5, {x: 2, y: 1, orientation: 'N'});
});

test('Robot can handle movement', t => {
	const try1 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'F');
	t.deepEqual(try1, {x: 2, y: 2, orientation: 'N'});

	const try2 = handleRobotInstruction({x: 2, y: 1, orientation: 'N'}, 'FFF');
	t.deepEqual(try2, {x: 2, y: 4, orientation: 'N'});
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
	t.deepEqual(try1, {x: 1, y: 1, orientation: 'E'});
});
