
function internal() {
	return 42;
}

function fn({num}) {
	return num * 2;
}

internal();

module.exports = fn;
