"use strict"

var constant = require('./constant');
module.exports =  (app) => {
    var view_path = appRoot()+"/"+constant.view_path
    app.set("views", view_path);
    app.set("view engine", "hbs");
};
  