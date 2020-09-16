'use strict';

// Load plugins
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const cp = require('child_process');
const cssnano = require('cssnano');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

const stylesPath = './app/styles/*.scss';
const imagePath = './app/images/*';
const scriptsPath = './app/js/**/*';

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    port: 3000,
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(['./dist/']);
}

// Optimize Images
function images() {
  return gulp
    .src('./app/images/*')
    .pipe(newer('./app/images'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        // imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest('./dist/images'));
}

// CSS task
// function css() {
//   return gulp
//     .src('./app/styles/**/*')
//     .pipe(plumber())
//     .pipe(sass({ outputStyle: 'expanded' }))
//     .pipe(gulp.dest('./app/styles/'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(gulp.dest('./dist/'))
//     .pipe(browsersync.stream());
// }
function css() {
  return gulp
    .src('./app/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
}

// Lint scripts
// function scriptsLint() {
//   return gulp
//     .src(['./assets/js/**/*', './gulpfile.js'])
//     .pipe(plumber())
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// }

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(['./app/js/**/*'])
      .pipe(plumber())
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest('./dist/'))
      .pipe(browsersync.stream())
  );
}

// Watch files
function watchFiles() {
  gulp.watch('./app/styles/*', css);
  // gulp.watch('./assets/js/**/*', gulp.series(scriptsLint, scripts));
  gulp.watch('./app/js/**/*', gulp.series(scripts));
  gulp.watch(['.'], gulp.series(browserSyncReload));
  gulp.watch('./app/images/*', images);
}

// define complex tasks
const js = gulp.series(scripts);
// const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, images, js));
// const build = gulp.series(gulp.parallel(css, images, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
