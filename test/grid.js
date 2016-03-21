import test from 'ava';

import grid from '../src/grid.js';

/*
	what if orientation differs, can a robot still fall off the grid?
*/

test('Is Valid Instruction', t => {
	const isValidMove = grid.__get__('isValidMove');
	t.is(typeof isValidMove, 'function');

	const sampleGrid = {
		xMax: 5,
		yMax: 3,
		scents: [
			{x: 2, y: 1, orientation: 'N'},
			{x: 1, y: 1, orientation: 'N'}
		]
	};

	const try1 = isValidMove(sampleGrid.scents, {
		x: 1, y: 1, orientation: 'N'
	});
	t.is(try1, false);

	const try2 = isValidMove(sampleGrid.scents, {
		x: 2, y: 1, orientation: 'E'
	});
	t.is(try2, true);

	const try3 = isValidMove(sampleGrid.scents, {
		x: 2, y: 1, orientation: 'N'
	});
	t.is(try3, false);

	const try4 = isValidMove(sampleGrid.scents, {
		x: 20, y: 15, orientation: 'N'
	});
	t.is(try4, true);

	const try5 = isValidMove(sampleGrid.scents, {});
	t.is(try5, true);

	const try6 = isValidMove(sampleGrid.scents, {
		x: 1
	});
	t.is(try6, true);
});
