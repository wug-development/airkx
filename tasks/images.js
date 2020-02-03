const gulp = require('gulp')
const livereload = require('gulp-livereload') // 热更新
// const imagemin = require('gulp-imagemin') //  图片压缩

//图片压缩
gulp.task("imagemin", done => {
    gulp.src("src/images/**/*") //  所有src > images中的图片
        // .pipe(imagemin()) // 图片压缩
        .pipe(gulp.dest(distpath + "/images"))  //放入到dist目录下面的images文件
        .pipe(livereload())
    done()
})