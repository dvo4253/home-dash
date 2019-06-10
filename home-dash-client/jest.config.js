module.exports = {
	verbose: true,
	collectCoverageFrom: [
		'src/**/*.js',
		'!node_modules/**/*.js',
		'!src/**/*.test.js',
		'!src/**/mock/**/*',
	],
	setupFilesAfterEnv: ['<rootDir>/util/testHelpers/setupTest.js'],
	setupFiles: ['<rootDir>/util/testHelpers/setupConfig.js'],
};
