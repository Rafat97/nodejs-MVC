import express from "express";
import figlet from "figlet";
import os from "os";
import { APP_NAME, APP_SERVICE_NAME, APP_PORT, APP_VERSION } from "./appInfo";

export const ExpressApplicationServerCreate = (app: express.Application) => {
  app.listen(APP_PORT, () => {
    console.log(figlet.textSync(APP_SERVICE_NAME));
    console.log(`v${APP_VERSION}`);
    console.log(`${APP_NAME} is listening on `, `http://localhost:${APP_PORT}`);
    console.log(`${APP_NAME} is hostname `, `${os.hostname()}`);
    console.log(`${APP_NAME} is platform `, `${os.platform()}`);
    console.log(`-------------------------------------------------------`);
  });
};
