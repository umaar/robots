
import {existsSync} from 'fs';

function internal() {
	return existsSync('./.travis.yml');
}

function fn({num}) {
	return num * 2;
}

internal();

module.exports = fn;
