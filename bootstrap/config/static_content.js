"use strict";
var constant = require("./constant");
module.exports = (app, express) => {
  const { static_content_path, static_content_url } = constant;
  let static_path = appRoot() + "/" + static_content_path;
  app.use(static_content_url, express.static(static_path));
  // app.use(express.static(static_path));
};
