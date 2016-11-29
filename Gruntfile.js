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
