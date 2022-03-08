"use strict";

async function name(req, res, next) {
  let response = {
    statusCode: 200,
    message: "hello world",
  };
  res.status(response.statusCode).send(response);
}

module.exports = name;
