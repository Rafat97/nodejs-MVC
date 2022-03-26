import dotenv from "dotenv";
dotenv.config();

function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export const APP_PORT = normalizePort(
  process.env.PORT || process.env.APP_PORT || "3000"
);

export const APP_NAME = process.env.APP_NAME || "test app";
export const APP_SERVICE_NAME = process.env.APP_SERVICE_NAME || "demo-service";
export const APP_VERSION = process.env.npm_package_version || "0.0.0";
