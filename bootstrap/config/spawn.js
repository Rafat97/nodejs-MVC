"use strict";

const spawn = require('cross-spawn');
spawn.sync('npm', ["install"], { stdio: 'inherit' });

module.exports = function () {};
