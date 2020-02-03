const gulp = require('gulp')
const livereload = require('gulp-livereload') // 热更新
const sass = require('gulp-sass')    //  sass
const cleanCSS = require('gulp-clean-css') // css压缩
// const auto = require('gulp-autoprefixer') //css兼容模块，做各浏览器的兼容
const replace = require('gulp-replace-task') // 替换变量

//css压缩并sass转换成css
gulp.task("sassc", done => {
    gulp.src("src/sass/*.scss")  //手动创建
        .pipe(sass()) //将sass文件编译成css文件
        .pipe(replace(reoption))
        /*.pipe(auto({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ],
            cascade: false
        }))*/ //处理兼容
        .pipe(cleanCSS())  //压缩css
        .pipe(gulp.dest(distpath + "/css"))   //通过gulp sassc 命令，自动输出dist/css文件
        .pipe(livereload())
    done()
})