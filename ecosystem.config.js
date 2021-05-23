"use strict";

require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'PM2 APP CONFIG RUN',
      script: './bin/www',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};