import Express from "express";
import {
  Create,
  Delete,
  FindAll,
  FindAllByUserId,
  FindOneByQuoteId,
  FindOneByPayementId,
  FindOne,
  Update,
} from "../controllers/seminar.controller";
import { verifyToken } from "./middleware/authJwt";

const SeminarRoute = (app: any) => {
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

  app.post("/seminar", [verifyToken], Create);
  app.get("/seminar/:id", FindOne);
  app.get("/seminars/:userId", [verifyToken], FindAllByUserId);
  app.get("/seminar/quote/:quoteId", [verifyToken], FindOneByQuoteId);
  app.get("/seminar/payement/:payementId", [verifyToken], FindOneByPayementId);
  app.get("/seminars", [verifyToken], FindAll);
  app.put("/seminar/:id", [verifyToken], Update);
  app.delete("/seminar/:id", [verifyToken], Delete);
};

export default SeminarRoute;
