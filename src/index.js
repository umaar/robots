require('babel-register')({
	plugins: ['babel-plugin-rewire']
});
require('babel-polyfill');

const main = require('./main');

const num = 5;
const result = main({num});

console.log(`Result ${result}`);

