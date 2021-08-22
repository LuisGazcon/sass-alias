/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: __dirname,
	coverageDirectory: '<rootDir>/tests',
	moduleNameMapper: {
		'^@(/.*)': '<rootDir>/source/$1',
	},
};
