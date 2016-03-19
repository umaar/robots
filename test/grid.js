import test from 'ava';

import grid from '../src/grid.js';

test('Is Valid Instruction', t => {
	const isValidMove = grid.__get__('isValidMove');
	t.is(typeof isValidMove, 'function');

	isValidMove();
});
