import express, { Request, Response, NextFunction } from "express";

const metricHttpCounter = (app: express.Application, meter: any) => {
  const httpCounter = meter.createCounter("http_calls");
  app.use((request: Request, response: Response, next: NextFunction) => {
    httpCounter.add(1);
    next();
  });
};

export default metricHttpCounter;
