import { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import helmet from "helmet";
import cors from "cors";
import methodOverride from "method-override";
import compression from "compression";
import logger from "morgan";

const defaultMiddleware = (app: any) => {
  app.use(logger("common"));
  app.set("trust proxy", true);
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.set("trust proxy", 1);
  app.use(compression());

  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log(`PROCESS ID = ${process.pid}`);
    next();
  });
  app.use(methodOverride());
};

export default defaultMiddleware;
