import Express from "express";
import {
  Create,
  Delete,
  FindAll,
  FindOne,
  Update,
} from "../controllers/seminar.controller";

export const AuthRoute = (app: Express.Application) => {
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

  app.post("/seminar", Create);
  app.get("/seminar", FindOne);
  app.get("/seminars", FindAll);
  app.put("/seminar", Update);
  app.delete("/seminar", Delete);
};
