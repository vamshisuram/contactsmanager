module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './www/lib/angular/angular.js',
      './www/lib/angular/angular-mocks.js',
      './www/js/**/*.js',
      './test/**/*.spec.js'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    plugins: ['karma-jasmine'],
    reporters: ['progress'],
    autoWatch: false
  });
};
