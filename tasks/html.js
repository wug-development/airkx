const gulp = require('gulp')
const livereload = require('gulp-livereload') // 热更新
const fileinclude = require('gulp-file-include') // 处理包含文件
const replace = require('gulp-replace-task') // 替换变量

//页面生成处理
gulp.task("copyHtml", done => {
    gulp.src("src/**/*.html")
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent:true //保留文件的缩进
        }))
        .pipe(replace(reoption))
        .pipe(gulp.dest('dist'))  //把src目录中所有html格式的文件全部合并到dist目录中
        .pipe(livereload())
    gulp.src("src/*.ico")
        .pipe(gulp.dest('dist'))  //把src目录中所有html格式的文件全部合并到dist目录中
        .pipe(livereload())
    done()
})