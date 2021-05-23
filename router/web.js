"use strict";

module.exports = [
  routeCreate("get", "/", require("../stub/controller/index")),
  routeCreate("get", "/number/:id(\\d+)/", using("stub/controller/index")),
  routeCreate("use", "/users", using("stub/controller/users")),
  routeCreate("resource", "forum", using("stub/controller/forum/index")),
];
