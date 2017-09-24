const SRC = './web/public/'
const DST = './web/public/' // eventually we'll have dev and production

const path = require('path')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const rename = require('gulp-rename')
const minifycss = require('gulp-cssnano')

gulp.task('default', [], function () {
  gulp.start('css')
})

gulp.task('css', function () {
  return gulp
    .src(path.join(SRC, 'css/style.scss'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'expanded' })
    .on('error', sass.logError))
    .pipe(gulp.dest(path.join(DST, 'css')))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(path.join(DST, 'css/')))
})

gulp.task('watch', function () {
  gulp.watch(path.join(SRC, 'css/**/*'), ['css'])
})