"use strict";

const mkdirp = require('mkdirp')
var fs = require("fs");
var constant = require('./config/constant');
var getDirName = require('path').dirname;

function routeCache(data) {
  mkdirp.sync(getDirName(constant.router_cache_path))
  fs.writeFileSync(constant.router_cache_path, JSON.stringify(data,null, 4));
}

module.exports = function (parent) {
  var app = parent;
  var route = using(constant.router_path);
  var generated_route = [] 
  route.forEach((element) => {
    var fun_type = element.fun || use;
    var url = element.url;
    if (url) {
      app[fun_type](element.url, element.controller);
      generated_route.push({path:element.url,request_type:fun_type,controller_type:element.typeof_parem})
    } else {
      console.log(element.url);
      throw new Error(`unrecognized route: ${element.url}`);
    }
    routeCache(generated_route)
  });

  //app.use("/", require("../stub/controller/index"));
  //app.resource("forums", require("../stub/controller/forum"));
};
