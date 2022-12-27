import Express from "express";
import {
  Create,
  FindOne,
  FindOneSiret,
  FindAll,
  Update,
  Delete,
} from "../controllers/organization.controller";
import { verifyData } from "./middleware/verifyData";

const OrganizationRoute = (app: any) => {
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

  app.post("/organization", [verifyData.checkDuplicateOrganization], Create);
  app.put("/organization/:id", Update);
  app.delete("/organization/:id", Delete);
  app.get("/organization/:id", FindOne);
  app.get("/organization/:siret", FindOneSiret);
  app.get("/organizations", FindAll);
};

export default OrganizationRoute;
