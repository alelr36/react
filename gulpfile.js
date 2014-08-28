'use strict';

var gulp = require('gulp'),
    react = require('gulp-react'),
    server = require('./server');

gulp.task('compile-react', function () {
    return gulp.src('./app-components/src/components/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./app-components/target/components'));
});

gulp.task('default', ['compile-react']);