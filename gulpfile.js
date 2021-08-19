const gulp = require('gulp')
const rename = require("gulp-rename")
const uglify = require('gulp-uglify-es').default
const jshint = require('gulp-jshint')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const strip = require('gulp-strip-comments')
const stripCssComments = require('gulp-strip-css-comments')
const babel = require('gulp-babel')

function clean() {
  return del(['dist'])
}
function lint_js(cb) {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
}
async function run_image_min() {
  gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
}
async function run_copy_image() {
  gulp.src('src/img/*')
    .pipe(gulp.dest('dist/img'))
}
async function run_copy_webfonts() {
  gulp.src('src/css/fontawesome/webfonts/*')
    .pipe(gulp.dest('dist/webfonts'))
}
async function img() {
  run_copy_image()
}
function run_js() {
  return gulp.src([
    'src/js/bulma.js',
    'src/js/app.js'
  ])
    .pipe(strip())
    .pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify())
    .pipe(concat('bundle.min.js'))
		.pipe(gulp.dest("dist/js"))
}
function run_css() {
  return gulp.src([
    'src/css/!(style)*.css', // all files that end in .css EXCEPT style*.css
    'src/css/fontawesome/css/*.css',
    'src/css/style.css'
  ])
    .pipe(stripCssComments())
		.pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('bundle.min.css'))
		.pipe(gulp.dest("dist/css"))
}
function run_html() {
  return gulp.src('src/*.html')
    .pipe(strip())
    .pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest("dist"))
}
function watch_all() {
  gulp.watch('src/js/*.js',run_js)
  gulp.watch('src/img/*',img)
  gulp.watch('src/css/*.css',run_css)
  gulp.watch('src/*.html',run_html)
}

exports.clean = clean
exports.lint_js = lint_js
exports.run_image_min = run_image_min
exports.run_copy_image = run_copy_image
exports.run_copy_webfonts = run_copy_webfonts
exports.img = img
exports.run_js = run_js
exports.run_css = run_css
exports.run_html = run_html
exports.watch_all = watch_all

exports.watch = watch_all
exports.build = gulp.series(clean,run_js,run_css,run_html,img,run_copy_webfonts)
exports.default = watch_all