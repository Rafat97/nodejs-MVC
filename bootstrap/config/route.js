"use strict";

function route (type, url, controllerData) {
    return {
      url: url,
      fun: type,
      controller: controllerData,
      typeof_parem:typeof controllerData,
    };
  };

module.exports = route;