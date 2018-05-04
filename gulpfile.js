//  requires

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const htmlbeautify = require('gulp-html-beautify');
const injectfile = require("gulp-inject-file");
const open = require('gulp-open');
const devLink = 'https://burberrybeautydev.tumblr.com/';

//  sass and vendor prefixes

const autoprefixerOptions = {
    browsers: [
        'last 2 version',
        'safari 5',
        'ie 7', 'ie 8', 'ie 9',
        'opera 12.1',
        'ios 6', 'android 4'
    ]
};

gulp.task('styles', function() {
    gulp.src('src/css/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cssbeautify())
        .pipe(gulp.dest('src/css/'))
});

//  concat js files

gulp.task('scripts', function() {
    return gulp.src('src/js/modules/*.js')
        .pipe(concat('./scripts.js'))
        .pipe(gulp.dest('src/js/'));
});

//  inject CSS

gulp.task('compile', function () {
    return gulp.src('src/index.html')
    .pipe(injectfile({
        pattern: '<!--\\s*inject:<filename>-->'
    }))
    .pipe(gulp.dest('dist/'));
});

//  html beautify

gulp.task('htmlbeautify', function() {
    var options = {
        indentSize: 4
    };
    gulp.src('./dist/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/'))
});

//  open theme

gulp.task('uri', function(){
    gulp.src(__filename)
    .pipe(open({uri: devLink}));
});

//  run tasks + watch

gulp.task('default', ['watch', 'uri']);
gulp.task('watch', function() {
    //gulp.watch('src/js/modules/*.js', ['scripts']);
    //gulp.watch('src/css/sass/*.scss',['styles']);
    // gulp.watch('src/js/modules/*.js', ['compile']);
    // gulp.watch('src/css/sass/*.scss',['compile']);
    gulp.watch('src/index.html',['compile']);
    gulp.watch('src/**/**/*.*',['scripts', 'styles', 'compile']);
    gulp.watch('./dist/*.html',['htmlbeautify']);
})
