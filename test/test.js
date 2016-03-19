import test from 'ava';

import main from '../src/main.js';

test('Boilerplate function', t => {
	main.__Rewire__('existsSync', () => true);
	const internal = main.__get__('internal');
	t.is(internal(), true);

	const fn = main.__get__('fn');
	const num = 2;
	t.is(fn({num}), 4);
});
