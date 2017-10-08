const SRC = './web/public/src'
const DST = './web/public/dst' // eventually we'll have dev and production

const del = require('del')
const path = require('path')
const gulp = require('gulp')

const gulpTasks = require('./gulpTasks.js')

gulp.task('default', ['clean'], function () {
  gulp.start(
    'sass',
    'images',
    'pdf',
    'fonts',
    'vendors',
    'jsBlog',
    'jsAdmin',
    'jsProjects',
    'jsCommun')
})

gulp.task('clean', function () {
  return del(DST) // Before deploying delete the files and rebuild everything.
})

gulp.task('watch', function () {
  gulp.watch(path.join(SRC, 'css/**/*'), ['sass'])

  gulp.watch(path.join(SRC, 'images/**/*'), ['images'])
  gulp.watch(path.join(SRC, 'pdf/**/*'), ['pdf'])
  gulp.watch(path.join(SRC, 'fonts/**/*'), ['fonts'])
  gulp.watch(path.join(SRC, 'vendors/**/*'), ['vendors'])
  gulp.watch(path.join(SRC, 'vendors/**/*'), ['vendors'])

  // Javascript
  gulp.watch(path.join(SRC, 'js/jsBlog/**/*.js'), ['jsBlog'])
  gulp.watch(path.join(SRC, 'js/jsCommun/**/*.js'), ['jsCommun'])
  gulp.watch(path.join(SRC, 'js/jsProjects/**/*.js'), ['jsProjects'])
  gulp.watch(path.join(SRC, 'js/jsAdmin/**/*.js'), ['jsAdmin'])
})

gulp.task('clean', function () {

})

gulp.task('sass', function () {
  return gulpTasks.compileSass({
    src: path.join(SRC, 'css/style.scss'),
    dst: path.join(__dirname, DST, 'css')
  })
})

gulp.task('images', function () {
  const excludePsd = path.join(SRC, 'images/**/*.psd')
  return gulpTasks.optimizeImages({
    src: [
      path.join(SRC, 'images/**/*'),
      excludePsd
    ],
    dst: path.join(DST, '/images')
  })
})

gulp.task('pdf', function () {
  return gulpTasks.copyPdfs({
    src: path.join(SRC, 'pdf/**/*'),
    dst: path.join(DST, 'pdf')
  })
})

gulp.task('fonts', function () {
  return gulpTasks.copyPdfs({
    src: path.join(SRC, 'fonts/**/*'),
    dst: path.join(DST, 'fonts')
  })
})

gulp.task('vendors', function () {
  return gulpTasks.copyVendors({
    src: path.join(SRC, 'vendors/**/*'),
    dst: path.join(DST, 'vendors')
  })
})

gulp.task('jsBlog', function () {
  return gulpTasks.buildJs({
    src: [
      path.join(SRC, 'js/blog/**/*.js')
    ],
    dst: path.join(DST, 'js'),
    filename: 'blog.main.js'
  })
})

gulp.task('jsCommun', function () {
  return gulpTasks.buildJs({
    src: [
      path.join(SRC, 'js/commun/**/*.js')
    ],
    dst: path.join(DST, 'js'),
    filename: 'commun.main.js'
  })
})

gulp.task('jsProjects', function () {
  return gulpTasks.buildJs({
    src: [
      path.join(SRC, 'js/projects/**/*.js')
    ],
    dst: path.join(DST, 'js'),
    filename: 'projects.main.js'
  })
})

gulp.task('jsAdmin', function () {
  return gulpTasks.buildJs({
    src: [
      path.join(SRC, 'js/admin/**/*.js')
    ],
    dst: path.join(DST, 'js'),
    filename: 'admin.main.js'
  })
})

/*
gulp.task('cssVendors', function () {
  return gulp
    .src([
      path.join(__dirname, '/bower_components/normalize-css/normalize.css'),
      path.join(__dirname, '/bower_components/devicon/devicon.min.css'),
      path.join(__dirname, '/bower_components/Ionicons/css/ionicons.min.css'),
      path.join(__dirname, SRC, '/vendors/animate.min.css')
    ])
    //.src('/bower_components/normalize-css/normalize.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('vendors.min.css'))
    .pipe(gulp.dest(path.join(__dirname, DST + '/css')))
})
*/
