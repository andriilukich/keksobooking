'use strict';

const gulp = require('gulp'),
  rename = require('gulp-rename'),
  server = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  rigger = require('gulp-rigger'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  csso = require('gulp-csso'),
  imgMin = require('gulp-imagemin'),
  jpegtran = require('imagemin-jpegtran'),
  webp = require('gulp-webp'),
  svgstore = require('gulp-svgstore'),
  posthtml = require('gulp-posthtml'),
  include = require('posthtml-include'),
  uglify = require('gulp-uglify');


// gulp.task('css', () => {
//     return gulp.src('./src/sass/main.scss')
//     .pipe(plumber())
//     .pipe(rigger())
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(postcss([ autoprefixer() ]))
//     .pipe(csso())
//     .pipe(rename('style.min.css'))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./build/css'))
//     .pipe(server.stream());
// });

// gulp.task('js', () => {
//     return gulp.src('./src/js/**/*.js')
//     .pipe(plumber())
//     .pipe(rigger())
//     .pipe(sourcemaps.init())
//     .pipe(uglify({toplevel: true}))
//     .pipe(rename('script.min.js'))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./build/js'))
//     .pipe(server.stream());
// });

// gulp.task('font', () => {
//   return gulp.src('./src/fonts/**/*.{woff,woff2}')
//     .pipe(gulp.dest('./build/fonts'))
//     .pipe(server.stream());
// });

gulp.task('images', () => {
  return gulp.src('./src/img/**/*.{png,jpg,jpeg,svg,gif}')
    .pipe(imgMin([
      imgMin.optipng({ optimizationLevel: 3 }),
      imgMin.svgo(),
      jpegtran({ progressive: true }),
    ]))
    .pipe(gulp.dest('./build/img'));
});

// gulp.task('webp', () => {
//   return gulp.src('./build/img/**/*.{jpg,png}')
//     .pipe(webp({ quality: 90 }))
//     .pipe(gulp.dest('./build/img'));
// });

// gulp.task('sprite', () => {
//   return gulp.src('./build/img/**/icon-*.svg')
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename('sprite.svg'))
//     .pipe(gulp.dest('./build/img'));
// });

gulp.task("html", () => {
  return gulp.src("./src/*.html")
    .pipe(rigger())
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('./build'));
});

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('clean-build', () => {
  return del('./build');
});

// gulp.task('clean-img', () => {
//   return del('./build/img');
// });

gulp.task('copy', () => {
  return gulp.src([
    './src/css/*.css',
    './src/js/*.js',
    './src/fonts/**/*.{woff,woff2}',
    './src/*.ico'
  ], {
    base: './src'
  })
    .pipe(gulp.dest('./build'));
});

gulp.task('server', () => {
  server.init({
    server: './build/'
  });

  // gulp.watch('./src/scss/**/*.{scss,sass}', gulp.series('css'));
  // gulp.watch('./src/js/**/*.{js,jsx}', gulp.series('js'));
  // gulp.watch('./src/fonts/**/*.{woff,woff2}', gulp.series('font'));
  // gulp.watch('./src/img/**/*.{png,jpg,svg}', gulp.series(html', 'refresh'));
  gulp.watch('./src/*.html', gulp.series('html', 'refresh'));
});

gulp.task('build', gulp.series('clean-build', 'copy', 'images', 'html'));
gulp.task('start', gulp.series('build', 'server'));

// gulp.task('copy', () => {
//    return gulp.src([
//         './src/fonts/**/*.{woff, woff2}',
//         './src/img/**',
//         './src/*.ico'
//     ],{
//        base: './src'
//     })
//     .pipe(gulp.dest('./build'));
// });
