import test from 'ava';
import rewire from 'rewire';

const main = rewire('../src/main.js');
const internal = main.__get__('internal');

test('Boilerplate function', t => {
	t.plan(2);

	const num = 2;
	t.is(main({num}), 4);

	t.is(internal(), 42);
});
