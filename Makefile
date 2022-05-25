start:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

.PHONY: test