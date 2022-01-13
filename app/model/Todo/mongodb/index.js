"use strict";

const mongoose = require("mongoose");
const schemaDefine = require('./schema')

const todoSchema = new mongoose.Schema(
  schemaDefine,
  { timestamps: true }
);

require('./event')(todoSchema)

const Todo = mongoose.model("Todo", todoSchema);
// Todo.watch().on("change", (data) => console.log(new Date(), data)); //not support localhost need replica sets 
module.exports = Todo;
