import Express from "express";
import {
  Create,
  Delete,
  FindAll,
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
  app.get("/seminar/:id", [verifyToken], FindOne);
  app.get("/seminars", [verifyToken], FindAll);
  app.put("/seminar/:id", [verifyToken], Update);
  app.delete("/seminar/:id", [verifyToken], Delete);
};

export default SeminarRoute;
