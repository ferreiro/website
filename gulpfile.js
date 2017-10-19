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
  gulp.watch(path.join(SRC, 'js/blog/**/*.js'), ['jsBlog'])
  gulp.watch(path.join(SRC, 'js/admin/**/*.js'), ['jsAdmin'])
  gulp.watch(path.join(SRC, 'js/commun/**/*.js'), ['jsCommun'])
  gulp.watch(path.join(SRC, 'js/projects/**/*.js'), ['jsProjects'])
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
      path.join(SRC, 'images/**/*.jpg'),
      path.join(SRC, 'images/**/*.jpeg'),
      path.join(SRC, 'images/**/*.png'),
      path.join(SRC, 'images/**/*.gif'),
      path.join(SRC, 'images/**/*.svg')
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
  gulpTasks.compressVendorsCss({
    src: path.join(SRC, 'vendors/**/*.css'),
    dst: path.join(DST, 'vendors'),
    filename: 'vendors.css'
  })
  gulpTasks.compressVendorsJs({
    src: path.join(SRC, 'vendors/**/*.js'),
    dst: path.join(DST, 'vendors'),
    filename: 'vendors.js'
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
