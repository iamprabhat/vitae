#!/usr/bin/env node


/*!
 * Vitaé®
 * Curriculum Vitaé of Prabhat Kumar — CEO, Founder & Scientist.
 * ___________________________________________________________________________
 *
 * Grunt, http://gruntjs.com/ — The JavaScript Task Runner.
 * ___________________________________________________________________________
 *
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * ___________________________________________________________________________
 *
 * @date      : 30-Nov-2016
 * @license   : MIT
 * @require   : Node.js®
 * @require   : NPM
 * @require   : grunt-cli
 * @build     : SEED™ — Umeå
 *              └────── A Sequømics Product — http://sequomics.com/.
 * ___________________________________________________________________________
 *
 * --/The Heart of Build System/-- of "Vitaé®".
 * ___________________________________________________________________________
 */


// # Usage: $ node -v
// # Usage: $ npm -v
// # Usage: $ grunt -version

// Invoking strict mode.
// @purpose: Strict mode applies to entire scripts or to individual functions.
"use strict";

// To load required NPM modules.
// -----------------------------
var chalk    = require('chalk');
var glob     = require('glob');

///-------------------
// An object literals.
///-------------------
var build = {
  // Nonidentifier property names are quoted.
  "system"    : "SEED™",
  "name"      : "Umeå",
  "year"      : "2016",
  "audience"  : "for all designer and scientist."
};

// Global variables.
// -----------------
var rootPath = './';
var appsPath = './app/';

// Default color defined.
// ----------------------
var noop     = chalk.red;
var yeep     = chalk.green;
var okay     = chalk.blue;

// To get 'version', i.e. required to work on
// SEED™: Grunt based build system. | See: http://seed.sequomics.com/.
var version = process.env.VERSION || require('./package.json').version;

///------------------------
// A smart banner function.
///------------------------
var banner = [
  '/*!                                                                                                  ',
  ' * Build System — ' + yeep(build.system) + ': ' + okay(build.name) + ' — ' + version                  ,
  ' * ' + noop(build.audience)                                                                           ,
  ' * ---------------------------------------------------------------------------                       ',
  ' * Copyright © 2015 - ' + new Date().getFullYear() + ', Sequømics Corporation, All rights reserved.  ',
  ' * Available via the Apache, version 2.0. [http://www.apache.org/licenses/]                          ',
  ' * See: http://seed.sequomics.com/ — for details.                                                    ',
  ' * ---------------------------------------------------------------------------                       ',
  ' */                                                                                                  ',
  '\n',
].map(function(s) {
  return s.replace(/\s+$/, '');
}).join("\n");

// ----------------------------------------------------------------------------------------------------------
// All Grunt Operations Defined... |--------------------------------------------| 30/Nov/2016 | SEED™ — Umeå.
//                           Copyright © 2016, Prabhat Kumar, All rights reserved.
// ----------------------------------------------------------------------------------------------------------

module.exports = function(grunt) {
  
  // Force use of Unix newlines.
  grunt.util.linefeed = '\n';
  
  // 1. time-grunt ——> $ npm install time-grunt --save-dev
  // -----------------------------------------------------
  // Display the elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);
  
  // Utility to load the different option files,
  // based on their names.
  function loadConfig(path) {
    var object = {};
    var key;
    
    glob.sync('*', {
      cwd: path
    }).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });
    return object;
  }
  
  /// Initial Configurations.
  var config = {
    pkg: grunt.file.readJSON('./package.json')
  };
  
  /// Loading Externally-Defined Tasks.
  /// http://gruntjs.com/api/grunt
  grunt.loadTasks('tasks');
  
  /// Loading all the tasks options in tasks/options base on the name:
  /// compass.js => compass{}
  grunt.util._.extend(config, loadConfig('./tasks/options/'));
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Project configuration for -//Vitaé®//- Build.
  // Date: 29-11-2016.
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  grunt.initConfig({
    config,
    appDirectory: 'app',
    // To execute 'shell' command(s).
    shell: {
      makeDir: {
        command: 'mkdir <%= appDirectory %>'
      },
      dirListing: {
        command: 'ls'
      }
    }
  });
  
  // 2. load-grunt-tasks ——> $ npm install load-grunt-tasks --save-dev
  // -----------------------------------------------------------------
  // Load multiple grunt tasks using globbing patterns.
  require('load-grunt-tasks')(grunt, {
    // Load all grunt-contrib tasks and another non-contrib task.
    pattern: ['grunt-contrib-*', 'grunt-shell'],
    scope: ['devDependencies', 'dependencies'],
    requireResolution: true
  });
  
  // Writing about Build System.
  grunt.log.writeln(banner);
  
  // A task to clean build(s) or Temporary file(s) and default cache directories.
  grunt.registerTask('clear', ['clean']);
  
  // A task to make [./app] directory and file(s).
  // Using: grunt-shell
  grunt.registerTask('make', ['shell']);
  
  // A task to build SCSS, also to Lint and Minify.
  // --------- http://compass-style.org/ ----------
  grunt.registerTask('build', ['compass', 'csslint', 'cssmin']);
  
  // A task to build HTML, and Minify.
  grunt.registerTask('html', ['htmlmin']);
  
  // A task to work on Normalize.css, from: https://github.com/necolas/normalize.css/blob/master/normalize.css
  // to Get and Compare.
  grunt.registerTask('normalize', ['get', 'compare']);
  
  // A task to build JavaScript, also to Lint, concatenate and Minify.
  grunt.registerTask('script', ['jshint', 'concat', 'uglify']);
  
  // A task to serve Vitaé®
  // on to default browser.
  grunt.registerTask('serve', ['connect', 'watch']);
  
  // A Default Task is basically a rebuild.
  grunt.registerTask('default', ['clear', 'build', 'html', 'script', 'connect', 'watch']);

};
