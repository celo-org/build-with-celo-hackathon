/*
 * Primary file for API
 *
 */

// Dependencies
var server = require("./lib/server");
var ethers = require("ethers");
var crypto = require("crypto");
let mail = require("./lib/mail");

var sql = require("./lib/sql");
// var workers = require('./lib/workers');

// Declare the app
var app = {};

// Init function
app.init = function () {
  // Start the server
  server.init();
};

// Self executing
app.init();
// Export the app
module.exports = app;
