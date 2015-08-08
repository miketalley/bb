var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	paths = {
		sass: ['scss/**/*.scss']
	};


gulp.task('compile-sass', function(){
	gulp.src(paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(uglify())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('css/'));
});

// Watch task to compile scss when updated
gulp.task('watch', function(){
	gulp.watch(paths.sass, ['compile-sass']);
});

gulp.task('default', ['compile-sass', 'watch']);