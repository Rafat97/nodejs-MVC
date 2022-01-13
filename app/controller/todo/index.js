"use strict";

const getAllTodo = require("./getAllTodo")
const insertTodo = require("./insertTodo")
const getSingleTodo = require("./getSingleTodo")
const updateTodo = require("./updateTodo")
const deleteTodo = require("./deleteTodo")

exports.index = getAllTodo

// exports.new = getAllTodo

exports.create = insertTodo

exports.show = getSingleTodo

// exports.edit = getSingleTodo

exports.update = updateTodo

exports.destroy = deleteTodo