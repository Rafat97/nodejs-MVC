"use strict"
var pjson = require('../package.json');

module.exports = (program) => {
  program
    .version(`Program version ${pjson.version}` , '-v, --version', 'output the current version')
    .parse(process.argv);
};
