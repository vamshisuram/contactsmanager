var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var karma = require('karma').server;

var paths = {
  "scripts": "./www/js/**/*.js",
  "testScripts": "./test/**/*spec.js"
};

var testWatcher = gulp.watch([paths.testScripts], 'test');
testWatcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks..');
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('jshint', function() {
  gulp.src([paths.scripts])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function(done) {
  karma.start({
    configFile: './karma.conf.js'
  }, done);
});

gulp.task('default', ['jshint', 'test']);
