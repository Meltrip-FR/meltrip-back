import Express from "express";
import { verifyToken, isAdmin } from "./middleware/authJwt";
import {
  FindAll,
  FindOne,
  UpdateUser,
  DeleteUser,
} from "../controllers/user.controller";

export const UserRoute = (app: any) => {
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

  app.get("/users/", [verifyToken, isAdmin], FindAll);
  app.get("/user/:id/", FindOne);
  app.put("/user/:id/", UpdateUser);
  app.delete("/user/:id", DeleteUser);
};
