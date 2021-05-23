"use strict";

/**
 * This is use for global require function from root dir.
 * So ,it is a better local require() paths for Node.js
 * @param name string
 *
 * @returns function
 */
// global.rootRequire = (name) => require(`${__dirname}/../${name}`);
global.using = (name) => require(`${__dirname}/../${name}`);
/**
 * This is use for creating route
 * @param type string
 * @param url string
 * @param controllerData function || object
 *
 * @returns function
 */
global.routeCreate = require("./config/route");

/**
 * This is use for creating route
 *
 * @returns function
 */
global.appRoot = () => {
  var path = require("path");
  return path.resolve(__dirname + "/../");
};

/**
 * This is use for mail sending
 *
 * @returns async function
 */
global.mailSend = require('./config/mail-sending')