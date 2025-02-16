import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpCssimport from 'gulp-cssimport';
import {deleteAsync} from 'del';
// задачи

export const favicon = () =>
  gulp
    .src('src/favicon_io/**/*')
    .pipe(gulp.dest('dist/favicon_io'))
    .pipe(browserSync.stream({once: true}));

export const html = () => gulp.src('src/*.html').pipe(gulp.dest('dist')).pipe(browserSync.stream());

export const css = () =>
  gulp
    .src('src/css/**/*.css')
    .pipe(
      gulpCssimport({
        extensions: ['css'],
      })
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());

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
  gulp.watch('./src/css/**/*.css', css);
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch(['./src/image/**/*', './src/fonts/**/*'], copy);
  gulp.watch('./src/favicon_io/**/*', favicon);
};

export const clear = (done) => {
  return deleteAsync(['dist/**/*'], {
    force: true,
  }).then(() => done());
};

// запуск

export const base = gulp.parallel(html, css, js, copy, favicon);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);

// import gulp from 'gulp';
// import browserSync from 'browser-sync';
// import gulpCssimport from 'gulp-cssimport';
// import {deleteAsync} from 'del';

// // задачи

// // Переносим иконки в корень, но сохраняем структуру папок
// export const favicon = () =>
//   gulp
//     .src('src/favicon_io/**/*') // Исходная папка favicon
//     .pipe(gulp.dest('./favicon_io')) // Сохраняем в корень
//     .pipe(browserSync.stream({once: true}));

// export const html = () =>
//   gulp
//     .src('src/*.html') // Берём все HTML файлы
//     .pipe(gulp.dest('./')) // Копируем в корень
//     .pipe(browserSync.stream());

// export const css = () =>
//   gulp
//     .src('src/css/**/*.css') // Берём все CSS файлы
//     .pipe(
//       gulpCssimport({
//         extensions: ['css'],
//       })
//     )
//     .pipe(gulp.dest('./css')) // Копируем в корень, в папку css
//     .pipe(browserSync.stream());

// export const js = () =>
//   gulp
//     .src('src/script/**/*.js') // Все JS файлы
//     .pipe(gulp.dest('./script')) // Копируем в корень, в папку script
//     .pipe(browserSync.stream());

// export const copy = () =>
//   gulp
//     .src(['src/fonts/**/*', 'src/image/**/*'], {
//       base: 'src', // Сохраняем структуру для этих папок
//     })
//     .pipe(gulp.dest('./')) // Копируем в корень, сохраняем структуру
//     .pipe(browserSync.stream({once: true}));

// // Инициализация сервера
// export const server = () => {
//   browserSync.init({
//     ui: false,
//     notify: false,
//     server: {
//       baseDir: './', // Рабочая папка теперь — корень
//     },
//   });

//   gulp.watch('./src/**/*.html', html);
//   gulp.watch('./src/css/**/*.css', css);
//   gulp.watch('./src/script/**/*.js', js);
//   gulp.watch(['./src/image/**/*', './src/fonts/**/*'], copy);
//   gulp.watch('./src/favicon_io/**/*', favicon); // Добавляем отслеживание favicon
// };

// // Очистка dist
// export const clear = (done) => {
//   return deleteAsync(['dist/**/*'], {
//     force: true,
//   }).then(() => done());
// };

// // запуск

// export const base = gulp.parallel(html, css, js, copy, favicon);

// export const build = gulp.series(clear, base);

// export default gulp.series(base, server);
