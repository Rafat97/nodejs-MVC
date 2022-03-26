import express, { Request, Response, NextFunction } from "express";
export const ExpressApplicationDefaultErrorHandler = (
  app: express.Application,
  customBusinessLogic: Function
) => {
  app.use(
    async (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      customBusinessLogic(err, req, res, next);
    }
  );
};
