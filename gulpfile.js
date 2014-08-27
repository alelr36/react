'use strict';

var gulp = require('gulp'),
    react = require('gulp-react');

gulp.task('default', function () {
    return gulp.src('./app-components/src/components/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./app-components/target/components'));
});