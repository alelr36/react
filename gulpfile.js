'use strict';

var gulp = require('gulp'),
    react = require('gulp-react'),
    server = require('./server'),
    router = require('./router');

gulp.task('startServer', function () {
    server.start(router.route);
});

gulp.task('compile-react', function () {
    return gulp.src('./app-components/src/components/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./app-components/target/components'));
});

gulp.task('watch', function () {
    gulp.watch('./app-components/src/components/*.jsx', ['compile-react']);
});

gulp.task('default', ['compile-react', 'startServer']);