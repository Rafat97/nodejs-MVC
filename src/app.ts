import CallTracingFunction from "@/bootstrap/tracingCalling";
const { meter, tracer } = CallTracingFunction();

import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import * as api from "@opentelemetry/api";
import defaultMiddleware from "@/bootstrap/defaultMiddleware";
import { ExpressApplicationServerCreate } from "@/bootstrap/appServer";
import { ExpressApplicationDefaultErrorHandler } from "@/bootstrap/defaultErrorHandler";
import { ExpressApplicationDefaultRoute } from "@/bootstrap/defaultRoute";
import metricHttpCounterMiddleWare from "@/middleware/metricHttpCounter";
import TestRouter from "@/router/router";
import IndexRouter from "@/router/index";

dotenv.config();
const app = express();

defaultMiddleware(app);
// metricHttpCounterMiddleWare(app, meter); // add metric counter Prometheus

app.use("/test", TestRouter());
app.use(IndexRouter());

// application * route
// ExpressApplicationDefaultRoute(
//   app,
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log("default route");
//   }
// );

// application error handler
ExpressApplicationDefaultErrorHandler(
  app,
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    const activeSpan = api.trace.getSpan(api.context.active());
    activeSpan?.recordException(err);
    console.error(`Critical error`, {
      traceId: activeSpan?.spanContext().traceId,
    });
    return res.status(500).send({
      success: false,
      message: "An error occurred",
    });
  }
);

// server creation
ExpressApplicationServerCreate(app);
