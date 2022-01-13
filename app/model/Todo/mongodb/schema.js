"use strict";

module.exports = {
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
    required: [true,"Title is required"],
  },
};
