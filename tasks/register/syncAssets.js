module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'browserify',
		'bower:dev',
		'less:dev',
		'sass:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
