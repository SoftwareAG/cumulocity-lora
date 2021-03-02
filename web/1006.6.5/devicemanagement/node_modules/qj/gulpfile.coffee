gulp = require 'gulp'
browserify = require 'browserify'
coffeeify = require 'coffeeify'
source = require 'vinyl-source-stream'
spawn = require('child_process').spawn
server = require('tiny-lr')()
livereload = require('gulp-livereload')
rename = require 'gulp-rename'
rimraf = require 'gulp-rimraf'
connect = require 'gulp-connect'
open = require 'gulp-open'
mocha = require 'gulp-mocha'
runs = require 'run-sequence'

development = process.env.NODE_ENV == 'development'

gulp.task 'test', ->
  gulp.src('./test')
    .pipe(mocha({ report: 'nyan', compilers: 'coffee:coffee-script/register' }))
    .pipe(gulp.dest('.'))

gulp.task 'default', ['watch']
