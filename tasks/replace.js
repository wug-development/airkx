const gulp = require('gulp')

//替换本地配置文件
gulp.task("replacedev", done => {
    const _reset = require('../setdev.json');
    setreplace(_reset)
    done()
})

//替换测试配置文件
gulp.task("replacetest", done => {
    const _reset = require('../setbuild.json');
    setreplace(_reset)
    done()
})

function setreplace(_reset){
    reoption = {
        patterns:[
            { match:'csspath', replacement:_reset.csspath },
            { match:'fontpath', replacement:_reset.fontpath },
            { match:'imgpath', replacement: _reset.imgpath },
            { match:'xmimgpath', replacement:_reset.xmimgpath },
            { match:'bannerimgpath', replacement:_reset.bannerimgpath },
            { match:'jspath', replacement:_reset.jspath },
            { match:'js1path', replacement:_reset.js1path },
            { match:'pagepath', replacement:_reset.pagepath },
            { match:'apispath', replacement:_reset.apispath },
            { match:'apiopath', replacement:_reset.apiopath },
            { match:'money', replacement:_reset.money },
            { match:'verson', replacement:(new Date()).getTime() }
        ]
    }
}