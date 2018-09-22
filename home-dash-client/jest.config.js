module.exports = {
	verbose: true,
	collectCoverageFrom: [
		'src/**/*.js',
		'!node_modules/**/*.js',
		'!src/**/*.test.js',
		'!src/**/mock/**/*',
	],
	setupTestFrameworkScriptFile: '<rootDir>/util/testHelpers/setupTest.js',
	setupFiles: ['<rootDir>/util/testHelpers/setupConfig.js'],
};
