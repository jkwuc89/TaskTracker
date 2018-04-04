// Karma configuration
// Generated on Fri Feb 16 2018 08:57:09 GMT-0500 (EST)

let webpackConfig = require("./webpack.config.js");

module.exports = function(config) {
    config.set({

        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "./src/js",

        // Using Jasmine (https://jasmine.github.io) as our testing framework
        // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine"],

        // List of files / patterns under basePath above to load in the browser
        files: [
            "tests/**/*Spec.js",
            "tests/**/*.spec.js"
        ],

        // List of files / patterns to exclude
        exclude: [],

        // Expose webpack config to Karma
        webpack: webpackConfig,

        // Preprocess matching files before serving them to the browser
        // This allows us to use ES6 inside the tests
        // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "tests/**/*Spec.js": ["webpack"],
            "tests/**/*.spec.js": ["webpack"]
        },

        // Test results reporter to use
        // Possible values: 'dots', 'progress'
        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["progress"],

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["PhantomJS"],

        // Continuous Integration mode
        // If true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // How many browser should be started simultaneous
        concurrency: Infinity
    })
}
