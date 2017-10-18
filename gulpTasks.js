const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const Cache = require('gulp-file-cache')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const sassGlob = require('gulp-sass-glob')
const minifycss = require('gulp-cssnano')
const minifyCSS = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')

module.exports.compileSass = function compileSass(opts) {
  return gulp
    .src(opts.src)
    .pipe(autoprefixer('last 2 version'))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(opts.dst))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(opts.dst))
}

module.exports.optimizeImages = function optimizeImages(opts) {
  return gulp
    .src(opts.src)
    .pipe(gulp.dest(opts.dst))
  /*
  return gulp
    .src(opts.src)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(opts.dst))
    */
}

module.exports.copyPdfs = function copyPdfs (opts) {
  return gulp
    .src(opts.src)
    .pipe(gulp.dest(opts.dst))
}

module.exports.compressVendorsCss = function compressVendorsCss (opts) {
  return gulp
    .src(opts.src)
    .pipe(concat(opts.filename))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(opts.dst))
}

module.exports.compressVendorsJs = function compressVendorsJs (opts) {
  return gulp
    .src(opts.src)
    .pipe(concat(opts.filename))
    .pipe(rename({
      suffix: '.min'
    }))
    //.pipe(uglify())
    .pipe(gulp.dest(opts.dst))
}

module.exports.buildJs = function buildJs (opts) {
  var cache = new Cache()
  return gulp
    .src(opts.src)
    .pipe(cache.filter()) // remember files
    .pipe(babel({
      presets: ['es2015'] // compile ne ones
    }))
    .pipe(concat(opts.filename))
    .pipe(rename({ suffix: '.min' }))
    // .pipe(uglify())
    .pipe(cache.cache()) // cache them
    .pipe(gulp.dest(opts.dst)) // write them
}



