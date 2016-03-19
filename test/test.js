import test from 'ava';
import fn from '../src/main.js';

test('Boilerplate function', t => {
	t.plan(1);
	const num = 2;
	t.is(fn({num}), 4);
});
