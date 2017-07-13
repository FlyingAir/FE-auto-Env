var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var browserSync = require('browser-sync');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var connect = require('gulp-connect'); 


gulp.task('develop',['server','ejs-watch']);
gulp.task('production',['ejs-transform']);
gulp.task('ejs-watch', function() {
    gulp.watch('./develop/view/**/*.ejs', ['ejs-transform']);
});

//ejs 编译并 dest
gulp.task('ejs-transform',function(){
    gulp.src('./develop/view/*/*.ejs',{
        base:process.cwd()
    })
    .pipe(ejs().on('error', function(err) {
        gutil.log(err);
        this.emit('end');
    }))
    .pipe(rename(function (path) {
        path.dirname = 'html/' + path.dirname.split(/\\/).reverse()[0];
        console.log(path.dirname)
        path.extname = ".html";
    }))
    .pipe(gulp.dest('./static'))
})

gulp.task('live-reload-watch', function() {
    gulp.watch('./static/**', ['reload']); //监控
});

gulp.task('reload', function() {
    gulp.src('./static/index.html')
        .pipe(connect.reload());
});

gulp.task('server', ['connect', 'live-reload-watch']);

gulp.task('connect', function() {
    connect.server({
        host: '127.0.0.1', //地址，可不写，不写的话，默认localhost
        port: 3000, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true //自动刷新
    });
});
