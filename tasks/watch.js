const gulp = require('gulp')
const watch = require("gulp-watch")
const livereload = require('gulp-livereload') // 热更新

//监听文件是否有变化
gulp.task("watch",  done => {
    livereload.listen()
    watch("src/**/*.html", gulp.series('copyHtml'))
    watch("src/images/*", gulp.series('imagemin'))
    watch("src/js/*.js", gulp.series('uglify'))
    watch("src/js/lib/*.js", gulp.series('libjs'))
    watch("src/fonts/*", gulp.series('fonts'))
    watch("src/sass/*.scss", gulp.series('sassc'))
    done()
})