import os from "os";
import cluster from "cluster";
import dotenv from "dotenv";
import http from "http";
// import '@bootstrap/boot'
import express, { Request, Response, NextFunction } from "express";
// import app from "@/app";
import debug from "debug";

dotenv.config();
const app = express();

/**
 * Some const info about app.
 */

const port = normalizePort(process.env.PORT || process.env.APP_PORT || "3000");
const app_name = process.env.APP_NAME || "test app";
const app_service_name = process.env.APP_SERVICE_NAME || "demo-service";
const app_version = process.env.npm_package_version || "0.0.0";
const numCPUs = os.cpus().length;
import figlet from "figlet";
const clusterType = process.env.CLUSTER || "master";

app.set("port", port);
debug(`${app_name}:server`);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

serverClustering(server, clusterType);

function serverClustering(server: any, clusterType: string) {
  if (clusterType === "master") {
    runFromMaster(server);
  } else if (clusterType === "worker") {
    runFromWorker(server);
  } else {
    throw new Error("Not supported yet");
  }
}

/**
 * runFromWorker to run server in Worker cluster.
 * cpu/2
 */
function runFromWorker(server: any) {
  if (cluster.isPrimary) {
    let numberofworker = numCPUs / 2 || 0;
    if (numberofworker === 0) {
      throw new Error(
        "Please run into master. You have enough resources to run into worker"
      );
    }
    for (let i = 0; i < numberofworker; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log(`worker code ${code}`);
      console.log(`worker signal ${signal}`);
      cluster.fork();
    });
  } else {
    console.log(`Worker ${process.pid} started`);
    createdServer(server);
  }
}

/**
 * runFromMaster to run server in Master cluster.
 */
function runFromMaster(server: any) {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    createdServer(server);
  }
}

/**
 * createdServer to create server listener.
 */
function createdServer(server: any) {
  server.listen(port, listenOnPort);
  server.on("error", onError);
  server.on("listening", () => onListening(server));
}

/**
 * Normalize a port into a number, string, or false.
 */

function listenOnPort() {
  console.log(figlet.textSync(app_service_name));
  console.log(`v${app_version}`);
  console.log(`${app_name} is listening on `, `http://localhost:${port}`);
  console.log(`${app_name} is hostname `, `${os.hostname()}`);
  console.log(`${app_name} is platform `, `${os.platform()}`);
  console.log(`-------------------------------------------------------`);
}

/**
 * Normalize a port into a number, string, or false.
 */

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  console.log("Error Catch by createServer");
  console.error(error);
  if (error.syscall !== "listen") {
    console.error(error);
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    // case 'EPIPE':
    //   console.error(`${app_name} server: ${bind} is already in use`);
    //   process.exit(1);
    //   break;
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server: any) {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
