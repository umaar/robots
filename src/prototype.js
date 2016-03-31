require('babel-register')();

require('babel-polyfill');

const prototypeSrc = require('./prototypeSrc');
prototypeSrc();

