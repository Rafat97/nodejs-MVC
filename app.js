"use strict";

// global variable load
require("./bootstrap/bootglobal");

// npm install check
// require("./bootstrap/config/spawn");

var createError = require("http-errors");

var express = require("express"),
  Resource = require("./bootstrap/express-resource/index"),
  app = express();
var bodyParser = require("body-parser");
var helmet = require("helmet");
const mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var logger = require("morgan");
var cors = require("cors");
const Mail = require("nodemailer/lib/mailer");
var compression = require('compression')
var csrf = require('csurf')
var responseTime = require('response-time')
require("dotenv").config();

// view engine setup
require('./bootstrap/config/view_content')(app)

app.use(responseTime())
app.use(cookieParser());
app.use(csrf({ cookie: true }))
// define a custom res.message() method
// which stores messages in the session
app.response.message = function (msg) {
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

app.set('trust proxy', 1) 
// session support
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.APP_KEY || process.env.APP_NAME || "keyboard cat",
  })
);
// allow overriding methods in query (?_method=put)
app.use(methodOverride("_method"));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(logger("common"));
// app.use(express.json());
// // parse request bodies (req.body)
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./bootstrap/config/static_content')(app,express)
app.use(flash());
app.use(compression())

// expose the "messages" local variable when views are rendered
app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  // expose "messages" local variable
  res.locals.messages = msgs;
  // expose "hasMessages"
  res.locals.hasMessages = !!msgs.length;

  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});

app.use(function(req, res, next){
  console.log(process.pid)
  next()
});
// require('./bootstrap/boot')(app, { verbose: !module.parent });
require("./bootstrap/config/mongoose")(mongoose);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

require("./bootstrap/bootrouter")(app);

module.exports = app;
