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
    .pipe(gulp.dest('dist/favicon'))
    .pipe(browserSync.stream({once: true}));

export const html = () => gulp.src('src/*.html').pipe(gulp.dest('dist')).pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }
  return gulp
    .src('src/css/**/*.css')
    .pipe(
      gulpCssimport({
        extensions: ['css'],
      })
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};

export const js = () =>
  gulp.src('src/script/**/*.js').pipe(gulp.dest('dist/script')).pipe(browserSync.stream());

export const copy = () =>
  gulp
    .src(['src/fonts/**/*', 'src/image/**/*'], {
      base: 'src',
    })
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({once: true}));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    //  tunnel: true,
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch('./src/**/*.html', html);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch(['./src/image/**/*', './src/fonts/**/*'], copy);
  gulp.watch('./src/favicon/**/*', favicon);
};

export const clear = (done) => {
  return deleteAsync(['dist/**/*'], {
    force: true,
  }).then(() => done());
};

// запуск

export const base = gulp.parallel(html, style, js, copy, favicon);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);
