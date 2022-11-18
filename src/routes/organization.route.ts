import Express from "express";
import { Create } from "../controllers/organization.controller";

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

  app.post("/organization", Create);
  // app.get("/organization", FindOne);
  // app.get("/organizations", FindAll);
  // app.put("/organization", Update);
  // app.delete("/organization", Delete);
};

export default OrganizationRoute;
