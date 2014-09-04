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

gulp.task('copy-css', function() {
    gulp.src('./app-components/src/components/**/*.css')
        .pipe(gulp.dest('./app-components/target/components'));
});

gulp.task('browserify', function() {
    gulp.src('./app-components/src/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./app-components/target'));
});

gulp.task('compile-react', function () {
    return gulp.src('./app-components/src/components/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./app-components/target/components'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('./app-components/src/**/*', ['build']);
});

gulp.task('build', ['compile-react', 'browserify', 'copy', 'copy-css']);

gulp.task('default', ['watch']);