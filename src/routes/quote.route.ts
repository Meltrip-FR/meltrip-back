import Express from "express";
import {
  Create,
  FindOne,
  FindAll,
  Update,
  Delete,
} from "../controllers/quote.controller";

const QuoteRoute = (app: any) => {
  app.use(
    (
      _req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    }
  );

  app.post("/quote", Create);
  app.put("/quote/:id", Update);
  app.delete("/quote/:id", Delete);
  app.get("/quote/:id", FindOne);
  app.get("/quotes", FindAll);
};

export default QuoteRoute;
