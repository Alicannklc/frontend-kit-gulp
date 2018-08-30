var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');

gulp.task('frontend-kit-bootstrap', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'))
});

gulp.task('js', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.slim.min.js','node_modules/popper.js/dist/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', './js/*.js']).pipe(gulp.dest('./js'))
});

gulp.task('watch', ['frontend-kit-bootstrap'], function() {
  gulp.watch('./js/*.js', ['js']);
  gulp.watch(['scss/*.scss'], ['frontend-kit-bootstrap']);
});

gulp.task('default', ['frontend-kit-bootstrap', 'js'], function() {
});
