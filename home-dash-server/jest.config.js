module.exports = {
	verbose: true,
	testRegex: '/src/.*\\.test\\.js$',
	collectCoverageFrom: [
		'src/**/*.js',
		'!node_modules/**/*.js',
		'!src/**/*.test.js',
		'!src/**/mock/**/*',
	],
	// setupTestFrameworkScriptFile: '<rootDir>/util/testHelpers/setupTest.js',
	// setupFiles: ['<rootDir>/util/testHelpers/setupConfig.js'],
};
