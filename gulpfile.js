var gulp = require('gulp');
var precss = require('precss');
var autoPre = require('autoprefixer');
var cssnano = require('cssnano');
var gutil = require('gulp-util');
var path = require('path');
var livereload = require('gulp-livereload');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var connet = require('gulp-connect')
//postcss
gulp.task('css', function () {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('./develop/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            precss,
            autoPre
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./static/css/'))
        .pipe(livereload());
});
gulp.task('css-watch', function () {
    gulp.watch('./develop/css/**/*.css', ['css']);
});

gulp.task('ejs-watch', function () {
    gulp.watch('./develop/view/**/*.ejs', ['ejs-transform']);
});

//ejs 编译并 dest
gulp.task('ejs-transform', function () {
    gulp.src('./develop/view/*/*.ejs', {
        base: process.cwd()
    })
        .pipe(ejs().on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(rename(function (path) {
            // mac
            // path.dirname = 'html/' + path.basename;
            // win
            path.dirname = 'html/' + path.basename.split(/\\/).reverse()[0];
            path.extname = ".html";
        }))
        .pipe(gulp.dest('./static/'))
})
//热更新
gulp.task('live-reload-watch', function () {
    livereload.listen();
    gulp.watch('./static/**/**/*.*', function (file) {
        livereload.changed(file.path);
    })
});
//启动服务
gulp.task('connect', function () {
    connet.server({
        host: '127.0.0.1', //地址，可不写，不写的话，默认localhost
        port: 3000, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true //自动刷新
    })
})
gulp.task('production', ['ejs-transform']);
gulp.task('server', ['connect', 'live-reload-watch']);
gulp.task('develop', ['server', 'ejs-watch', 'css-watch']);
