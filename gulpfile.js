var gulp = require('gulp'),
  sass= require('gulp-sass');
  browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs');

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.sass')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true})) 
});
gulp.task('browser-sync', function() { 
  browserSync({ 
    server: { 
      baseDir: 'app' 
    },
    notify: false 
  });
});  
gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js    // Наблюдение за другими типами файлов
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
//        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
//        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});
