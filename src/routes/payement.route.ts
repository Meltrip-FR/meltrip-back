import Express from "express";
import {
  // Create,
  buyByStripe,
  webhook,
  FindOne,
  FindAll,
  Update,
  Delete,
} from "../controllers/payement.controller";

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

  // app.post("/payement", Create);
  app.put("/payement/:id", Update);
  app.delete("/payement/:id", Delete);
  app.get("/payement/:id", FindOne);
  app.get("/payements", FindAll);

  app.post("/payement", buyByStripe);
  app.post("/payement/webhook", webhook);
  // app.post("/success/:token/", verifPay);
  // app.get("/error/", error);
  // app.get("/genere/:reserverId", findOneCode);
};

export default PayementRoute;
