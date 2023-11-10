# The default target must be at the top
.DEFAULT_GOAL := start

install:
	npm install

update-deps:
	ncu -u

start:
	node src/main.js

unit:
	./node_modules/.bin/ava

test: unit

