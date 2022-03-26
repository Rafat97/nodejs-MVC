import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import * as api from "@opentelemetry/api";

function IndexRouter() {
  let router = express.Router();

  router.get("/health", (request: Request, response: Response) => {
    response.json({
      success: true,
      message: "Healthy",
    });
  });
  return router;
}

export default IndexRouter;
