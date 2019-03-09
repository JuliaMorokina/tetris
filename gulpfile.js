const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    babel = require('gulp-babel');

async function copyJs() {
    return gulp.src('src/js/**/*.js')
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                .pipe(concat('main.js'))
                .pipe(gulp.dest('./dist/js'))
                .pipe(browserSync.stream());
}

async function copyImg() {
    return gulp.src('src/img/**/*.*')
                .pipe(gulp.dest('./dist/img'))
                .pipe(browserSync.stream());
}

async function copyFile() {
    let css = gulp.src('src/css/**/*.css')
                    .pipe(gulp.dest('./dist/css'));
    let fonts = gulp.src('src/fonts/**/*.*')
                    .pipe(gulp.dest('./dist/fonts'));
    let html = gulp.src('src/*.html')
                    .pipe(gulp.dest('./dist'))
    return css, fonts, html;
}

async function style() {
    return gulp.src('src/sass/*.sass')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dist/css'))
            .pipe(browserSync.stream());
}

async function clean() {
    return del(['dist/*']);
}

gulp.task('clean', clean);

async function serve() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
        tunnel: true
    });
    gulp.watch('./src/js/**/*.js', copyJs);
    gulp.watch('./src/img/**/*.*', copyImg);
    gulp.watch('./src/sass/**/*.sass', style);
    
}

gulp.task('build', gulp.series(clean,
                    gulp.parallel(style, copyImg, copyJs, copyFile)
                ));

gulp.task('default', gulp.series('build', serve));