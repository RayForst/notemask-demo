const { src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

function html() {
  return src(['src/templates/*.pug', '!src/templates/_*.pug'])
    .pipe(pug())
    .pipe(dest('public'))
}

function css() {
  return src('src/templates/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(dest('public'))
}

function js() {
  return src('src/javascript/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('public', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);