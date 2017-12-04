var gulp = require('gulp'),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    cssmin = require("gulp-minify-css"),
    livereload = require('gulp-livereload'),
    minifyHtml = require("gulp-minify-html"),
    del = require('del');


gulp.task('minall',['clear'], function () {
    gulp.src(['**/*.html', '!build/**/*.html', '!node_modules/**/*.html'])
        // .pipe(del('build/'))
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest('build/'));
    gulp.src([
        '**/*.js',
        '**/*.json',
        '!build/**/*.js',
        '!build/**/*.json',
        '!**/package.json',
        '!node_modules/**/*.js',
        '!node_modules/**/*.json',
        '!gulpfile.js',
        '!mine.js',
        '!server.js'
        , '!**/controller/**/*.js'
        , '!**/modules/**/*.js'
        , '!**/service/**/*.js'
        , '!**/directive/**/*.js'
        , '!**/directive/**/*.js'
        , '!**/home.js'
    ]) // 要压缩的js文件
        .pipe(gulp.dest('build/')); //压缩后的路径
    gulp.src([
        '**/controller/**/*.js',
        '**/modules/**/*.js',
        '**/lib/**/*.js',
        '**/data/**/*.js',
        '**/directive/**/*.js',
        '**/directive/**/*.js',
        '**/home.js',
        '!node_modules/**/*.js',
        '!build/**/*.js'
        ]) // 要压缩的js文件
        .pipe(uglify())
        .pipe(gulp.dest('build/')); //压缩后的路径
    gulp.src(['**/*.css', '!build/**/*.css', '!node_modules/**/*.css']) // 要压缩的js文件
        .pipe(cssmin())  //使用uglify进行压缩,更多配置请参考：
        .pipe(gulp.dest('build/')); //压缩后的路径
    gulp.src([
        '**/*.jpg',
        '**/*.jpge',
        '**/*.png',
        '**/*.gif',
        '**/*.bmp',
        '!build/**/*.jpg',
        '!build/**/*.jpge',
        '!build/**/*.gif',
        '!build/**/*.png',
        '!build/**/*.bmp'
    ]) // 要压缩的js文件
        .pipe(gulp.dest('build/')); //压缩后的路径
})
gulp.task('clear', function (e) {
    var st=del('build/');
    return st;
});
gulp.task('default', ['minall']);
