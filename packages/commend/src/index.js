"use strict"

const chalk = require('chalk');
const { program } = require('commander');
require('./options')(program)
 

console.log( `
${chalk.yellow('\nWelcome to command line of framework')}

${chalk.blue(`Node Version :  ${process.version}`)}

`);