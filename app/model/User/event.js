"use strict";

function event(userSchema) {
  userSchema.pre("save", (next) => {
    console.log("User model pre save");
    next();
  });
  userSchema.post("save", (doc) => {
    console.log("User model post save \n", doc);
  });
}

module.exports = event