var gulp = require('gulp')
	sass = require('gulp-sass'),
	babel = require('gulp-babel'),
	del = require('del'),
	async = require('async'),
	runSequence = require('run-sequence');

var DEST = './dest',
	SRC = './src';

gulp.task('clean', function(cb) {
	del(DEST, cb);
});

gulp.task('stylesheets', function() {
	return gulp.src(SRC + '/app.scss')
		.pipe(sass())
		.pipe(gulp.dest(DEST));
});

gulp.task('javascripts', function() {
	return gulp.src(SRC + '/app.js')
		.pipe(babel({ blacklist: [ 'useStrict' ] }))
		.pipe(gulp.dest(DEST));
});

gulp.task('html', function() {
	return gulp.src(SRC + '/app.html')
		.pipe(gulp.dest(DEST));
});

// gulp.task('build', [ 'clean' ], function(cb) {
// 	runSequence(
// 		[ 'stylesheets', 'javascripts', 'html' ],
// 		cb
// 	);
// });

gulp.task('build', gulp.series('clean', 'stylesheets', 'javascripts', 'html'));

gulp.task('deploy', gulp.series('build', function(cb) {
	console.log('deploy!');
	cb();
}));

gulp.task('default', gulp.series('deploy'));