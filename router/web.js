"use strict";

module.exports = [
  routeCreate("get", "/", require("../app/controller/index")),
  routeCreate("get", "/test", require("../app/controller/test")),
  routeCreate("resource", "todo", using("app/controller/todo/index")), // testing mongodb code
  // routeCreate("get", "/number/:id(\\d+)/", using("app/controller/index")),
  // routeCreate("use", "/users", using("app/controller/users")),
  // routeCreate("resource", "forum", using("app/controller/forum/index")),
];
