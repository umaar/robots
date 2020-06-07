import test from 'ava';

import {isValidMove, applyGridScents} from '../src/grid.js';

test('Is Valid Instruction', t => {
	const sampleGrid = {
		xMax: 5,
		yMax: 3,
		scents: [
			{x: 2, y: 1, orientation: 'N'},
			{x: 1, y: 1, orientation: 'N'}
		]
	};

	const try1 = isValidMove({
		x: 1, y: 1, orientation: 'N'
	}, sampleGrid.scents);
	t.is(try1, false);

	const try2 = isValidMove({
		x: 2, y: 1, orientation: 'E'
	}, sampleGrid.scents);
	t.is(try2, true);

	const try3 = isValidMove({
		x: 2, y: 1, orientation: 'N'
	}, sampleGrid.scents);
	t.is(try3, false);

	const try4 = isValidMove({
		x: 20, y: 15, orientation: 'N'
	}, sampleGrid.scents);
	t.is(try4, true);

	const try5 = isValidMove({}, sampleGrid.scents);
	t.is(try5, true);

	const try6 = isValidMove({
		x: 1
	}, sampleGrid.scents);
	t.is(try6, true);
});

test('can apply scents to a grid', t => {
	const sampleGrid = {
		scents: []
	};

	const sampleRobot = {
		x: 1,
		y: 1,
		orientation: 'N',
		lostStatus: 'LOST'
	};

	const grid1 = applyGridScents(sampleGrid, sampleRobot);
	t.is(grid1.scents.length, 1);
	t.deepEqual(grid1.scents[0], {x: 1, y: 1, orientation: 'N'});

	const grid2 = applyGridScents(sampleGrid, sampleRobot);
	t.is(grid2.scents.length, 2);
});

test('no scent is applied if robot is not lost', t => {
	const sampleGrid = {
		scents: []
	};

	const sampleRobot = {
		x: 1,
		y: 1,
		orientation: 'N',
		lostStatus: 100
	};

	const grid = applyGridScents(sampleGrid, sampleRobot);
	t.is(grid.scents.length, 0);
});
