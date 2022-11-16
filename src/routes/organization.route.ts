import Express from "express";
import { Create } from "../controllers/organization.controller";

export const OrganizationRoute = (app: any) => {
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
  // app.get("/seminar", FindOne);
  // app.get("/seminars", FindAll);
  // app.put("/seminar", Update);
  // app.delete("/seminar", Delete);
};
