import Express from "express";
import {
  Create,
  FindOne,
  FindAll,
  Update,
  Delete,
} from "../controllers/group.controller";
import { verifyData } from "./middleware/verifyData";

const GroupRoute = (app: any) => {
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

  app.post("/group", Create);
  app.put("/group/:id", Update);
  app.delete("/group/:id", Delete);
  app.get("/group/:id", FindOne);
  app.get("/groups", FindAll);
};

export default GroupRoute;
