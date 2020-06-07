# The default target must be at the top
.DEFAULT_GOAL := start

install:
	npm install

update-deps:
	ncu -u

start:
	node src/main.js

lint:
	./node_modules/.bin/xo

unit:
	./node_modules/.bin/ava

test: lint unit

