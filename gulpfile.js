var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    react = require('gulp-react'),
    jshint = require("gulp-jshint"),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    reactify = require('reactify');

gulp.task('clean', function () {
    rimraf.sync('./app-components/target');
});

gulp.task('copy', function() {
    gulp.src('./app-components/src/index.html')
        .pipe(gulp.dest('./app-components/target'));
});

gulp.task('copy-img', function() {
    gulp.src('./app-components/src/img/**/*')
    .pipe(gulp.dest('./app-components/target/img/'));
});

gulp.task('sass', function () {
    gulp.src('./app-components/src/components/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app-components/target/components'));
});

gulp.task('browserify', function() {
    gulp.src('./app-components/src/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./app-components/target'));
});

gulp.task("lint", function() {
    return gulp.src("./app-components/src/components/**/*.js")
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish", {verbose: true}))
        .pipe(jshint.reporter("fail"));
});

gulp.task('watch', ['heroku:build'], function() {
    gulp.watch('./app-components/src/**/*', ['heroku:build']);
});

gulp.task('heroku:build', ['clean', 'browserify', 'lint', 'copy', 'sass', 'copy-img']);

gulp.task('default', ['watch']);