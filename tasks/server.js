const gulp = require('gulp')
const connect = require('gulp-connect')

gulp.task('server', done => {
    connect.server({
        root: './dist/',
        livereload: true,
        host: 'localhost',
        port: 1239,
        directoryListing:false
    })
    done()
})