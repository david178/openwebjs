

module.exports = function(config){
    config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections, should be the root of your project
    // basePath : '../',
    basePath : '',


    // <script src="js/lib/dojo-config.js"></script> <!-- dojo config -->
    // <script src="//js.arcgis.com/3.11/"></script> <!-- esri -->
    // <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"></script> <!-- angular -->
    // <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.0.js"></script> <!-- angular: uiBootstrap -->
    // <!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-resource.js"></script> --> <!-- angular -->
    // <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script> <!-- jquery -->
    // <!-- ui libs -->
    // <script src="js/lib/bootstrap.min.js"></script> <!-- bootstrap -->
    // <script src="js/lib/jqueryui-1.10.4.min.js"></script> <!-- jqueryUI -->


    //npm install angular-mocks

 
    // files to include, ordered by dependencies
    files : [
      // // include relevant Angular files and libs
      // 'app/lib/angular/angular.js',
      // 'test/lib/angular/angular-mocks.js',
      // 'app/js/lib/dojo-config.js',
      // 'app/js.arcgis.com/3.11/',
 
      // // include js files
      // 'app/js/app.js',
      // 'app/js/app/*.js',
 


      // 'app/components/angular/angular.js',
      // 'app/components/angular-mocks/angular-mocks.js',
      // 'app/scripts/**/*.js',
      // 'test/spec/**/*.js'


      // 'app/components/angular/angular.js',
      // 'app/components/angular-mocks/angular-mocks.js',

        'bower_components/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        // 'app/js/*.js',
        // 'app/js/controllers/*.js',
        // 'app/js/directives/*.js',
        // 'app/js/services/*.js',

        // 'app/css/*.css',

        // 'app/index.html',
        // 'app/views/*.html',

        // //js scripts
        // 'app/js/app/browser.js',
        // 'app/js/app/controls.js',
        // 'app/js/app/layout.js',
        // 'app/js/app/map.js',
        // 'app/js/app/metrics.js',
        // 'app/js/app/modernizr.custom.js',
        // 'app/js/app/slidemenu.js',
        //angular scripts
        // 'app/js/app/controllers/controllers.js',

        // //tests
        // 'test/spec.js'


      // // include unit test specs
      // 'test/unit/*.js'
      'test/*.js'




          // 'app/js/*.js',
          // 'app/js/controllers/*.js',
          // 'app/js/directives/*.js',
          // 'app/js/services/*.js',

          // 'app/css/*.css',

          // 'app/index.html',
          // 'app/views/*.html',

          // //js scripts
          // 'app/js/app/browser.js',
          // 'app/js/app/controls.js',
          // 'app/js/app/layout.js',
          // 'app/js/app/map.js',
          // 'app/js/app/metrics.js',
          // 'app/js/app/modernizr.custom.js',
          // 'app/js/app/slidemenu.js',
          // //angular scripts
          // 'app/js/app/controllers/controllers.js',

          // //tests
          // 'test/spec.js'

    ],


    // // files to exclude
    // exclude : [
    //   'app/lib/angular/angular-loader.js'
    //   , 'app/lib/angular/*.min.js'
    //   , 'app/lib/angular/angular-scenario.js'
    // ],
 
    // karma has its own autoWatch feature but Grunt watch can also do this
    // autoWatch : false,
    autoWatch : false,

    // port : 8000,
 
    // testing framework, be sure to install the karma plugin
    frameworks: ['jasmine'],
 
    // browsers to test against, be sure to install the correct karma browser launcher plugin
    // browsers : ['Chrome', 'PhantomJS', 'Firefox'],
    browsers : ['PhantomJS'],

 
    // progress is the default reporter
    // reporters: ['progress'],
    // reporters : ['progress', 'junit'],
    // reporters : ['dots'],
    // reporters : ['dots', 'progress', 'junit', 'teamcity', 'coverage'],
    reporters : ['progress', 'coverage'],

    // coverageReporter: {
    //   type : 'text',
    //   // type : 'html',
    //   dir : 'coverage/'
    // },

    // coverageReporter: {
    //   type : 'text',
    //   dir : 'coverage/',
    //   file : 'coverage.txt'
    // },


    // coverageReporter: {
    //   type : 'text-summary'
    // },

    coverageReporter: {
      type : 'text',
      dir : 'test/coverage/',
      file : '' //coverage.txt
    },

    // coverageReporter: {
    //   reporters:[
    //     {type: 'html', dir:'coverage/'},
    //     {type: 'teamcity'},
    //     {type: 'text-summary'}
    //   ],
    // }

    //http://karma-runner.github.io/0.8/config/coverage.html

 
    // // map of preprocessors that is used mostly for plugins
    // preprocessors: {
 
    // },
 
    // list of karma plugins
    plugins : [
        // 'karma-progress-reporter',
        // 'karma-junit-reporter',
        // 'karma-chrome-launcher',
        // 'karma-firefox-launcher',
        'karma-coverage',
        'karma-jasmine',
        'karma-phantomjs-launcher'
    ]
})}