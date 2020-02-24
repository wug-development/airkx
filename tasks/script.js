require('babel-polyfill')
const gulp = require('gulp')
const livereload = require('gulp-livereload') // 热更新
const babel = require('gulp-babel'); // JS 转es5
const concat = require('gulp-concat') // JS合并
const uglify = require("gulp-uglify") // js压缩
const replace = require('gulp-replace-task') // 替换变量

//处理业务js
gulp.task("dealjs", done => {
    console.log('处理dealjs')
    gulp.src("src/js/*.js")
        .pipe(replace(reoption))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) //压缩js代码
        .pipe(gulp.dest(distpath + "/js")) //通过gulp uglify命令，自动输出dist下面js文件
        .pipe(livereload())
    done()
})
 
//lib/js复制
gulp.task("libjs", done => {
    console.log('复制libjs')
    gulp.src("src/js/lib/**/*")
        .pipe(gulp.dest(distpath + "/js/lib")) //通过gulp 命令，自动输出dist下面js文件
        .pipe(livereload())
    done()
})

//lib/js复制
gulp.task("conjs", done => {
    console.log('合并压缩utils.js')
    // 合并压缩
    gulp.src(["src/js/lib.js", "src/js/uri.js"])
        .pipe(concat('utils.js'))
        .pipe(replace(reoption))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) //压缩js代码
        .pipe(gulp.dest(distpath + "/js")) //通过gulp uglify命令，自动输出dist下面js文件
        .pipe(livereload())
    done()
})

//处理js
gulp.task("uglify", gulp.series(gulp.parallel('libjs', 'dealjs', 'conjs')), done => {
    console.log('script 完成')
    done()
})
