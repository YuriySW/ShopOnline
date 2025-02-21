// ///////////////////////////
// import gulp from 'gulp';
// import browserSync from 'browser-sync';
// import gulpCssimport from 'gulp-cssimport';
// import {deleteAsync} from 'del';
// // задачи

// export const favicon = () =>
//   gulp
//     .src('src/favicon/**/*')
//     .pipe(gulp.dest('docs/favicon'))
//     .pipe(browserSync.stream({once: true}));

// export const html = () => gulp.src('src/*.html').pipe(gulp.dest('docs')).pipe(browserSync.stream());

// export const css = () =>
//   gulp
//     .src('src/css/**/*.css')
//     .pipe(
//       gulpCssimport({
//         extensions: ['css'],
//       })
//     )
//     .pipe(gulp.dest('docs/css'))
//     .pipe(browserSync.stream());

// export const js = () =>
//   gulp.src('src/script/**/*.js').pipe(gulp.dest('docs/script')).pipe(browserSync.stream());

// export const copy = () =>
//   gulp
//     .src(['src/fonts/**/*', 'src/image/**/*'], {
//       base: 'src',
//     })
//     .pipe(gulp.dest('docs'))
//     .pipe(browserSync.stream({once: true}));

// export const server = () => {
//   browserSync.init({
//     ui: false,
//     notify: false,
//     //  tunnel: true,
//     server: {
//       baseDir: 'docs',
//     },
//   });

//   gulp.watch('./src/**/*.html', html);
//   gulp.watch('./src/css/**/*.css', css);
//   gulp.watch('./src/script/**/*.js', js);
//   gulp.watch(['./src/image/**/*', './src/fonts/**/*'], copy);
//   gulp.watch('./src/favicon/**/*', favicon);
// };

// export const clear = (done) => {
//   return deleteAsync(['docs/**/*'], {
//     force: true,
//   }).then(() => done());
// };

// // запуск

// export const base = gulp.parallel(html, css, js, copy, favicon);

// export const build = gulp.series(clear, base);

// export default gulp.series(base, server);

import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import gulpCssimport from 'gulp-cssimport';
import {deleteAsync} from 'del';

const prepros = true;

const sass = gulpSass(sassPkg);
// задачи
export const favicon = () =>
  gulp
    .src('src/favicon/**/*')
    .pipe(gulp.dest('docs/favicon'))
    .pipe(browserSync.stream({once: true}));

export const html = () => gulp.src('src/*.html').pipe(gulp.dest('docs')).pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('docs/css'))
      .pipe(browserSync.stream());
  }
  return gulp
    .src('src/css/**/*.css')
    .pipe(
      gulpCssimport({
        extensions: ['css'],
      })
    )
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.stream());
};

export const js = () =>
  gulp.src('src/script/**/*.js').pipe(gulp.dest('docs/script')).pipe(browserSync.stream());

export const copy = () =>
  gulp
    .src(['src/fonts/**/*', 'src/image/**/*'], {
      base: 'src',
    })
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.stream({once: true}));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    //  tunnel: true,
    server: {
      baseDir: 'docs',
    },
  });

  gulp.watch('./src/**/*.html', html);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch(['./src/image/**/*', './src/fonts/**/*'], copy);
  gulp.watch('./src/favicon/**/*', favicon);
};

export const clear = (done) => {
  return deleteAsync(['docs/**/*'], {
    force: true,
  }).then(() => done());
};

// запуск

export const base = gulp.parallel(html, style, js, copy, favicon);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);
