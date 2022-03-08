"use strict";

var chalk = require("chalk");

const option = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = async (mongoose) => {
  const CONNECTION_STRING = process.env.MONGODB_HOST || null;
  try {
    console.log("CHECKING MongoDB connection");
    const connection_str = await mongoose.connect(CONNECTION_STRING, option);
    console.log(connection_str);
    console.log("%s Connected mongoose Properly", chalk.green("✔️"));
  } catch (error) {
    console.error(error);
    console.log(
      "%s MongoDB connection error. Please make sure MongoDB is running.",
      chalk.red("✗")
    );
  }
};
