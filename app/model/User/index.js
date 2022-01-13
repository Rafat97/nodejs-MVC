"use strict";

const mongoose = require("mongoose");
const schemaDefine = require('./schema')

const userSchema = new mongoose.Schema(
  schemaDefine,
  { timestamps: true }
);

require('./event')(userSchema)

const User = mongoose.model("User", userSchema);
// User.watch().on("change", (data) => console.log(new Date(), data)); //not support localhost need replica sets 
module.exports = User;
