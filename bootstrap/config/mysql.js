"use strict";
const { Sequelize, Model, DataTypes } = require("sequelize");

const mysql_string = process.env.MYSQL_HOST || null;

const sequelize = new Sequelize(mysql_string);

module.exports = function () {
  console.log("asdasdk");
  // const connection_check =  await sequelize.authenticate();
  sequelize
    .authenticate()
    .then(() => {
      console.log("then");
    })
    .catch(() => {
      console.log("catch");
    });
  console.log(connection_check);
  console.log("as");
};

// const sequelize = new Sequelize(mysql_string);
