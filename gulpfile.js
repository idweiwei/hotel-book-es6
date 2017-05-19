const gulp = require('gulp');
const copy = require('gulp-copy');
const server = require('gulp-webserver');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const rubysass = require('gulp-ruby-sass');


//compile sass to css use gulp-sass
gulp.task('sass',function(){
	/*return gulp.src('src/scss/!*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))*/

    rubysass('src/scss/*.scss')
        .on('error', rubysass.logError)
        .pipe(gulp.dest('dist/css'))
});

//create dev server
gulp.task('server',['sass'],function(){
	return gulp.src('./')
	.pipe(server({
		host:'0.0.0.0',
		open:'http://localhost:8000/src/html/index.html',
		directoryListing: true,
		livereload:{
            enable: true, // need this set to true to enable livereload
            filter: function(fileName) {

                if(fileName.match(/node_modules|src\\js|src\\scss/)){
                	return false
                }
                return true
            }
        }
	}))
});

gulp.task('copy',function () {
	return gulp.src(['src/img'])
		.pipe(gulp.dest('dist'))
});

gulp.task('watch',function(){
	gulp.watch('src/scss/*.scss',['sass']);
	gulp.watch('src/html/*.html');
	gulp.watch('src/js/*.js',['webpack']);
	gulp.watch('src/component/*.js',['webpack']);
});

gulp.task('webpack',function(callback){
	webpack(config).run(function(err, stats) {
        callback();
    });
});

gulp.task('default',['server','watch','copy']);

