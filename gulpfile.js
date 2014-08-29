'use strict';

var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    react = require('gulp-react'),
    server = require('./server');

gulp.task('copy', function() {
    gulp.src('./app-components/src/index.html')
        .pipe(gulp.dest('./app-components/target'));
});

gulp.task('browserify', function() {
    gulp.src('./app-components/src/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./app-components/target/main.js'));
});

gulp.task('compile-react', function () {
    return gulp.src('./app-components/src/components/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./app-components/target/components'));
});

gulp.task('default', ['compile-react', 'browserify', 'copy']);