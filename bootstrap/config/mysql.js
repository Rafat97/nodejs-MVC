"use strict";
var chalk = require("chalk");
const { Sequelize } = require("sequelize");

module.exports = async () => {
  const mysql_string = process.env.MYSQL_HOST || null;
  try {
    const sequelize = new Sequelize(mysql_string);
    console.log("CHECKING MySQL connection");
    const connection_check = await sequelize.authenticate();
    console.log(connection_check);
    console.log("%s Connected mysql Properly", chalk.green("✔️"));
  } catch (error) {
    console.error(error);
    console.log(
      "%s MySQL connection error. Please make sure MySQL is running.",
      chalk.red("✗")
    );
  }
};
