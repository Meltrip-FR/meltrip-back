import Express from "express";
import {
  Create,
  FindOne,
  FindAll,
  Update,
  Delete,
} from "../controllers/organization.controller";
import { verifyData } from "./middleware/verifyData";

const MemberRoute = (app: any) => {
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

  app.post("/member", [verifyData.checkDuplicateMember], Create);
  app.put("/member/:id", Update);
  app.delete("/member/:id", Delete);
  app.get("/member/:id", FindOne);
  app.get("/members", FindAll);
};

export default MemberRoute;
