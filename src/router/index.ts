import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import * as api from "@opentelemetry/api";

function IndexRouter() {
  let router = express.Router();

  router.get("/", async (request: Request, response: Response) => {
    if (request.query["fail"]) {
      throw new Error("A really bad error :/");
    }

    const jwks = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const activeSpan = api.trace.getSpan(api.context.active());
    // console.log(api.context.active());
    activeSpan?.addEvent("JWKs Data", {
      jwks: JSON.stringify(jwks.data),
    });
    // var waitTill = new Date(new Date().getTime() + 30 * 1000);
    // while (waitTill > new Date()) {}
    response.json(jwks.data);
  });
  return router;
}

export default IndexRouter;
