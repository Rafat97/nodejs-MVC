"use strict";

var express = require("express");
var router = express.Router();
const User = using("stub/model/User");

function middleware(req, res, next) {
  console.log("middleware");
  next();
}

router.get("/", middleware, async (req, res, next) => {
  const userDoc = new User({ email: "test@mail.com" });
  try {
    await userDoc.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.response);
  }
  res.status(201).send(userDoc);
});

router.get("/test", middleware, function (req, res, next) {
  res.send("user test index");
});

module.exports = router;
