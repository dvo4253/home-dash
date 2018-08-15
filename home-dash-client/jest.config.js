module.exports = {
	verbose: true,
	collectCoverageFrom: [
		'src/**/*.js',
		'!node_modules/**/*.js',
		'!src/**/*.test.js',
		'!src/**/mock/**/*',
	],
	setupTestFrameworkScriptFile: '<rootDir>/utils/testHelpers/setupTest.js',
	setupFiles: ['<rootDir>/utils/testHelpers/setupConfig.js'],
};
