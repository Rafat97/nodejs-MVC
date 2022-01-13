"use strict";

function event(todoSchema) {
  todoSchema.pre("save", (next) => {
    console.log("Todo model pre save");
    next();
  });
  todoSchema.post("save", (doc) => {
    console.log("Todo model post save \n", doc);
  });
}

module.exports = event