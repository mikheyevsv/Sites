global.hostname = "localhost";

var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename');

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')({port: 35729}));
	app.use(express.static(__dirname + '/app'));
	app.listen('80', hostname);
});

var tinylr;
gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(35729);
});

function notifyLiveReload(event) {
	var fileName = require('path').relative(__dirname, event.path);
	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
}

gulp.task('styles', function () {
	gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : '_'}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('app'));
});

gulp.task('watch', function() {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/*.css', notifyLiveReload);
	gulp.watch('app/*.html', notifyLiveReload);
});

gulp.task('build', ['clean', 'img', 'styles', 'scripts'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
			'app/css/style.css',
			//'app/css/header.min.css',
			'app/css/media.min.css',
			'app/css/fonts.css'
		])
		.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
		.pipe(gulp.dest('dist/js'))

	var buildLib = gulp.src('app/libs/**/*') // Переносим скрипты в продакшен
		.pipe(gulp.dest('dist/libs'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
		.pipe(gulp.dest('dist'));

});
gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

});
