import express, { Request, Response, NextFunction } from "express";
export const ExpressApplicationDefaultRoute = (
  app: express.Application,
  customBusinessLogic: Function
) => {
  app.all("*", (req: Request, res: Response, next: NextFunction) =>
    customBusinessLogic(req, res, next)
  );
};
