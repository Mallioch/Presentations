var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var webpack = require('gulp-webpack');

gulp.task('default', ['css', 'js', 'sass', 'react', 'watch-css', 'watch-sass', 'watch-js', 'watch-react']);

gulp.task('css', function () {
    gulp.src(['assets/css/style.css', 'assets/css/calc.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('Content'));
});

gulp.task('js', function () {
    gulp.src('assets/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('Content'));
});

gulp.task('watch-js', function () {
    gulp.watch('assets/js/**/*.js', ['js', 'js-tests']);
});

gulp.task('watch-css', function () {
    gulp.watch('assets/css/**/*.css', ['css'])
});

gulp.task('watch-sass', function () {
    gulp.watch('assets/sass/**/*.scss', ['sass'])
});

gulp.task('watch-webpack', function () {
    gulp.watch('assets/webpack/**/*.js', ['webpack']);
});

gulp.task('sass', function () {
    gulp.src('assets/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'compressed' }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('Content'))
});

gulp.task('js-tests', function () {
    gulp.src('assets/mocha/**/*.js')
        .pipe(mocha({ reporter: 'nyan'}));
});

gulp.task('webpack', function () {
    gulp.src('assets/webpack/**/webpack.js')
        .pipe(webpack({
            output: {
                filename: 'webpack.js'
            }
        }))
        .pipe(gulp.dest('Content'));
});

gulp.task('watch-react', function () {
    gulp.watch('assets/react/**/*.js', ['react'])
});

gulp.task('react', function () {
    gulp.src('assets/react/to-do-app.js')
        .pipe(webpack({
            output: {
                filename: 'reactapp.js'
            },
            module: {
                loaders: [
                    { test: /\.js$/, loader: "jsx-loader?harmony" }
                ]
            }
        }))
        .pipe(gulp.dest('Content'));
});

gulp.task('ts', function () {
    gulp.src('assets/ts/calc.ts')
        .pipe(typescript({
            out: 'calc-ts.js'
        }))
        .pipe(gulp.dest('content'))
});

gulp.task('cmd', shell.task(['dosomething.bat']));