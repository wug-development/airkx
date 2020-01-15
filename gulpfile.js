const gulp = require('gulp')
const requireDir = require('require-dir'); // 任务文件管理

global.distpath = 'dist'; // 默认生成文件路径
global.pagepath = ''; // 默认生成页面路径
global.reoption = {}; // 文件内替换内容

requireDir('./tasks') // 获取任务列表

// 处理公共文件
gulp.task('dealtask', gulp.series(gulp.parallel('uglify', 'fonts', 'sassc'), done =>{//'imagemin', 
    done()
}))
// 处理本地文件+页面
gulp.task('dev', gulp.series(gulp.parallel('replacedev', 'dealtask', 'copyHtml'), done =>{
    done()
}))
// 生成测试服务器环境文件
gulp.task('test', gulp.series(gulp.parallel('replacetest', 'dealtask', 'copyHtml'), done => {
    console.log('build 成功')
    done()
}))
// 启动项目 > gulp
gulp.task('default', gulp.series(gulp.parallel('dev', 'server', 'watch'), done => {
    console.log('启动成功!')
    done()
}))