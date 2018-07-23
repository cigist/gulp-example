var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    autoprefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat')
    webpack = require('webpack')
    webpackStream = require('webpack-stream')
    webpackConfig = require('./webpack.config.js'),
    uglify = require('gulp-uglify');

gulp.task('imagemin', function () {
    var img_src = 'src/images/**/*', img_dist = 'dist/images';
    gulp.src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//for use webpack budle
gulp.task('script', function () {
    gulp.src('src/assets/lib/lib.js')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'));
});
gulp.task('js', function () {
    gulp.src('src/assets/js/*.js')
        // .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'));
});
gulp.task('sass', function () {
    return gulp.src('./src/assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('serve', ['imagemin', 'sass', 'script','js'], function () {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    // watch for CSS changes
    gulp.watch('src/assets/sass/*.scss', function () {
        gulp.run('sass');
    });
    // watch for JS changes
    gulp.watch('src/assets/lib/*.js', function () {
        gulp.run('script');
    });
    gulp.watch('src/assets/js/*.js', function () {
        gulp.run('js');
    });
    // watch for image
    gulp.watch('src/images/*', function () {
        gulp.run('imagemin');
    });
});