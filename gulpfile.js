var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	minify = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	paths = {
		sass: ['./app/scss/**/*.scss']
	};


gulp.task('compile-sass', function(){
	gulp.src(paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(minify().on('error', gutil.log))
		.pipe(concat('style.css').on('error', gutil.log))
		.pipe(gulp.dest('./app/css/'));
});

// Watch task to compile scss when updated
gulp.task('watch', function(){
	gulp.watch(paths.sass, ['compile-sass']);
});

gulp.task('default', ['compile-sass', 'watch']);