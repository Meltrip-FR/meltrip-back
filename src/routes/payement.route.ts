import Express from "express";
import {
  Create,
  FindOne,
  FindAll,
  Update,
  Delete,
} from "../controllers/quote.controller";

const PayementRoute = (app: any) => {
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

  app.post("/payement", Create);
  app.put("/payement/:id", Update);
  app.delete("/payement/:id", Delete);
  app.get("/payement/:id", FindOne);
  app.get("/payements", FindAll);
};

export default PayementRoute;
