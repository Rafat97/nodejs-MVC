const { constants } = require("buffer");
"use strict"

var constant = require('./constant');
module.exports =  (app,express) => {
    var static_path = appRoot()+"/"+constant.static_content_path
    app.use(express.static(static_path));
};
  