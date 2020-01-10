const gulp = require('gulp')
const livereload = require('gulp-livereload') // 热更新

//font复制
gulp.task("fonts", done => {
    gulp.src("src/font/*")
        .pipe(gulp.dest(distpath + "/font")) //通过gulp uglify命令，自动输出dist下面js文件
        .pipe(livereload())
    done()
})