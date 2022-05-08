start:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

.PHONY: test