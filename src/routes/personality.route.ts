import Express from "express";
import {
  Create,
  FindOne,
  FindAll,
  Update,
  Delete,
} from "../controllers/personality.controller";

const PersonalityRoute = (app: any) => {
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

  app.post("/personality", Create);
  app.put("/personality/:id", Update);
  app.delete("/personality/:id", Delete);
  app.get("/personality/:id", FindOne);
  app.get("/personalitys", FindAll);
};

export default PersonalityRoute;
