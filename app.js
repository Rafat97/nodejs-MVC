"use strict";

// custom package
// "@rafat97/commend": "file:./packages/commend",

// global variable load
require("./bootstrap/bootglobal");

// npm install check
// require("./bootstrap/config/spawn");

var express = require("express"),
  Resource = require("./bootstrap/express-resource/index"),
  app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// view engine setup
require("./bootstrap/config/view_content")(app);
require("./bootstrap/config/default_middleware")(app);

require("./bootstrap/config/static_content")(app, express);

// require('./bootstrap/boot')(app, { verbose: !module.parent });
if (process.env.DATABASE_TYPE === "mongodb") {
  require("./bootstrap/config/mongoose")(mongoose); // mongodb connection
} else if (process.env.DATABASE_TYPE === "mysql") {
  require("./bootstrap/config/mysql")(); // mysql connection
}

/**
 * Load all routes
 */
require("./bootstrap/bootrouter")(app);

module.exports = app;
