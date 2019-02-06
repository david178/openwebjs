// Generated on 2014-11-13
'use strict';

// helper variables and functions borrowed from generator-ember
var LIVERELOAD_PORT = 9876; //ORIG
//var LIVERELOAD_PORT = 8000; //test
var liveReloadSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    //instead of loadNpmTasks, load all dev dependencies from the package.json
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // read package file for properties
        pkg: grunt.file.readJSON('package.json'),


        // 'node-minify': {
        //   gcc: {
        //     files: {
        //       'dest/gcc.min.js': ['src/**/*.js']
        //     }
        //   }
        // },



        // copy files from downloaded packages into directories
        copy: {
            bootstrap: {
                files: {
                    'app/js/lib/bootstrap.min.js': 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'app/css/lib/bootstrap.min.css': 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'app/fonts/glyphicons-halflings-regular.eot': 'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
                    'app/fonts/glyphicons-halflings-regular.svg': 'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
                    'app/fonts/glyphicons-halflings-regular.ttf': 'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
                    'app/fonts/glyphicons-halflings-regular.woff': 'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'
                }
            },
            jquery: {
                files: {
                    'app/js/lib/jquery.min.js': 'bower_components/jquery/dist/jquery.min.js'
                }
            }
        },
        karma: {
              options: {
                configFile: 'karma.conf.js'
              },
              unit: {
                singleRun: true
              },
              continuous: {
                // keep karma running in the background
                background: true
              }
        },
        watch: {
            // //run unit tests with karma (server needs to be already running)
            // karma: {
            //         // run these tasks when these files change
            //         files: [
            //         'app/js/*.js',
            //         'app/js/controllers/*.js',
            //         'app/js/directives/*.js',
            //         'app/js/services/*.js',

            //         'app/css/*.css',

            //         'app/index.html',
            //         'app/views/*.html',

            //         //js scripts
            //         'app/js/app/browser.js',
            //         'app/js/app/controls.js',
            //         'app/js/app/layout.js',
            //         'app/js/app/map.js',
            //         'app/js/app/metrics.js',
            //         'app/js/app/modernizr.custom.js',
            //         'app/js/app/slidemenu.js',
            //         //angular scripts
            //         'app/js/app/controllers/controllers.js',

            //         //tests
            //         'test/spec.js'

            //         ],
            //         tasks: ['karma:unit:run'] // note the :run flag
            //       },

            //****************************************************
            //****************************************************
            karma: {
                    // run these tasks when these files change
                    // files: ['test/*.js'],
                    files: [
                        'app/js/*.js',
                        'app/js/controllers/*.js',
                        'app/js/directives/*.js',
                        'app/js/services/*.js',

                        'app/css/*.css',

                        'app/index.html',
                        'app/views/*.html',

                        //js scripts
                        'app/js/app/browser.js',
                        'app/js/app/controls.js',
                        'app/js/app/layout.js',
                        'app/js/app/map.js',
                        'app/js/app/display.js',
                        'app/js/app/metrics.js',
                        'app/js/app/modernizr.custom.js',
                        'app/js/app/slidemenu.js',
                        //angular scripts
                        'app/js/app/controllers/controllers.js',

                        //tests
                        'test/spec.js'

                    ],
                    tasks: ['karma:continuous:run'] // note the :run flag
            },

            //****************************************************
            //****************************************************


            options: {
                spawn: false,
                event: ['changed'],
                livereload: true
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/js/*.js',
                    'app/js/controllers/*.js',
                    'app/js/directives/*.js',
                    'app/js/services/*.js',

                    'app/css/*.css',

                    'app/index.html',
                    'app/views/*.html',

                    //js scripts
                    'app/js/app/browser.js',
                    'app/js/app/controls.js',
                    'app/js/app/layout.js',
                    'app/js/app/map.js',
                    'app/js/app/display.js',
                    'app/js/app/metrics.js',
                    'app/js/app/modernizr.custom.js',
                    'app/js/app/slidemenu.js',
                    //angular scripts
                    'app/js/app/controllers/controllers.js',

                    //tests
                    'test/spec.js'

                ]
            }
        },
        connect: {
            options: {
                //port: 8000, //ORIG
                // port: 9876, //test
                port: 8000, //test2
                open: false, //was true
                hostname: 'localhost' // set to 0.0.0.0 if want access from external
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            liveReloadSnippet,
                            mountFolder(connect, 'app')
                        ]
                    }
                }
            }
        },
        // karma: {

        //             unit: {
        //                 configFile: 'test/karma-unit.conf.js'
        //             },

        //             debug_test: {
        //                 configFile: 'test/karma-unit.conf.js',
        //                 singleRun: false
        //             }

        //         }

        // karma: {
        //   unit: {
        //     options: {
        //       files: ['test/**/*.js']
        //     }
        //   }
        // }

        // //in-grunt
        // karma: {
        //   unit: {
        //     options: {
        //       files: [
        //             'app/js/*.js',
        //             'app/js/controllers/*.js',
        //             'app/js/directives/*.js',
        //             'app/js/services/*.js',

        //             'app/css/*.css',

        //             'app/index.html',
        //             'app/views/*.html',

        //             //js scripts
        //             'app/js/app/browser.js',
        //             'app/js/app/controls.js',
        //             'app/js/app/layout.js',
        //             'app/js/app/map.js',
        //             'app/js/app/metrics.js',
        //             'app/js/app/modernizr.custom.js',
        //             'app/js/app/slidemenu.js',
        //             //angular scripts
        //             'app/js/app/controllers/controllers.js',

        //             //tests
        //             'test/spec.js'

        //         ]
        //     }//,
        //    // dev: {
        //    //     reporters: 'dots'
        //    // },
        //    // autoWatch: true
        //   }
        // }



        // //****************************************************
        // //****************************************************
        // // //in-karma.conf
        // // karma: {
        // //   unit: {
        // //     configFile: 'karma.conf.js'
        // //   }
        // // }



        // karma: {
        //       options: {
        //         configFile: 'karma.conf.js'
        //       },
        //       unit: {
        //         singleRun: true
        //       },
        //       continuous: {
        //         // keep karma running in the background
        //         background: true
        //       }
        //     }
        // //****************************************************
        // //****************************************************














        // karma: {
        //   unit: {
        //     configFile: 'karma.conf.js',
        //     background: true,
        //     singleRun: false
        //   }
        // }

        // //in-watch
        // karma: {
        //   unit: {
        //     options: {
        //       files: ['test/spec.js']
        //     },
        //     // configFile: 'node_modules/grunt-karma/karma.conf.js',
        //     background: true,
        //     singleRun: false
        //   }
        // }

        // karma: {
        //   unit: {
        //     options: {
        //       files: ['test/spec.js'],
        //       runnerPort: 8000,
        //       // browsers: ['Chrome', 'Firefox'],
        //       autoWatch: true
        //     },
        //       continuous: {
        //         singleRun: true,
        //         browsers: ['PhantomJS']
        //       },
        //       dev: {
        //         reporters: 'dots'
        //       }
        //   }
        // }

        // karma: {
        //   options: {
        //     configFile: 'karma.conf.js',
        //     runnerPort: 9999,
        //     browsers: ['Chrome', 'Firefox']
        //   },
        //   continuous: {
        //     singleRun: true,
        //     browsers: ['PhantomJS']
        //   },
        //   dev: {
        //     reporters: 'dots'
        //   }
        // }

        // karma: {
        //   unit: {
        //     options: {
        //       files: ['test/spec.js']
        //     },
        //     background: true,
        //     singleRun: false
        //   }
        // }

        // karma: {
        //   unit: {
        //     configFile: 'node_modules/grunt-karma/karma.conf.js',
        //     background: true,
        //     singleRun: false
        //   }
        // }

        // karma: {
        //   unit: {
        //     // configFile: 'node_modules/grunt-karma/karma.conf.js',
        //     options: {
        //       files: ['test/spec.js'],
        //       autoWatch: true
        //     },
        //    // runnerPort: 9999,
        //     singleRun: false,
        //     browsers: ['PhantomJS']
        //     // logLevel: 'ERROR'
        //   }
        // }
        // //http://stackoverflow.com/questions/28718584/in-karma-testing-referenceerror-describe-is-not-defined
        // //http://karma-runner.github.io/0.8/config/configuration-file.html

    });


    //****************************************************
    //****************************************************
    //make tests continuous:
    //https://blog.credera.com/technology-insights/java/testing-angularjs-part-3-karma-grunt/
    // grunt.registerTask('unit-test', ['karma:continuous:start', 'watch:karma']);
    // grunt.registerTask('unit-test', ['copy', 'connect', 'karma:continuous:start', 'watch:karma']);
    

    // grunt.loadNpmTasks('grunt-responsive-images');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-mkdir');
    grunt.registerTask('serve', ['copy', 'connect', 'karma:continuous:start', 'watch:karma']);

    // // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    // grunt.registerTask('default', ['copy', 'connect', 'karma:continuous:start', 'watch:karma']);
    // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('default', ['copy', 'connect']);




    //****************************************************
    //****************************************************

    // //unit tests
    // grunt.registerTask('test', 'karma:unit');
    // // grunt-karma https://github.com/karma-runner/grunt-karma

    // //server
    // grunt.registerTask('serve', ['copy', 'connect', 'watch']);
};