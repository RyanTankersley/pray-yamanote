"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');

var config = {
    paths: {
        public: './public',
        js: [
            './src/js/**/*.js',
            './src/js/**/*.jsx',
             './lib/*.js'],
        css: [
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
              './src/css/**/*.css'],
        tests: './test/**/*.js',
        mainJs: './src/js/main.js'
    }
};

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.public + '/css'));
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.public + '/scripts'));
});

gulp.task('watch', function() {
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('build', ['js', 'css']);

gulp.task('test', function() {
    return gulp.src(config.paths.tests, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('start', function () {
        nodemon({
          script: 'index.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('default', ['build', 'test', 'watch', 'start']);