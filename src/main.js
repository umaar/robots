
import {existsSync} from 'fs';

function uncovered() {
	return 42;
}

function internal() {
	return existsSync('./.travis.yml');
}

function fn({num}) {
	return num * 2;
}

internal();
uncovered();

module.exports = fn;
