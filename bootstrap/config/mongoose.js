var chalk = require('chalk')

"use strict";

const option = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = function (mongoose) {
  mongoose.connect(process.env.MONGODB_HOST, option);
  const db = mongoose.connection;
  db.on("error", function (err) {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  });
  db.once("open", function () {
    console.log('%s Connected mongoose Properly', chalk.green('✔️'));
  });
};
