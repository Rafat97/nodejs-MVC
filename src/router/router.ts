import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
function TestFunction() {
  let router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const apiResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/1`
    );
    // const activeSpan = api.trace.getSpan(api.context.active())!;
    // activeSpan.addEvent("Hello API Called", { randomIndex: 1 });
    console.log("Hello API Called");
    return res.status(200).send({
      success: true,
      result: apiResponse.data,
    });
  });
  return router;
}

export default TestFunction;
