import Express from "express";
import { verifyToken, isAdmin } from "./middleware/authJwt";
import {
  FindAll,
  FindOne,
  UpdateUser,
  DeleteUser,
  FindOneByUserTag,
  FindOneByEmail,
} from "../controllers/user.controller";

const UserRoute = (app: any) => {
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
  app.get("/users", [verifyToken, isAdmin], FindAll);
  app.get("/user/:id", [verifyToken], FindOne);
  app.put("/user/:id", [verifyToken], UpdateUser);
  app.delete("/user/:id", [verifyToken], DeleteUser);
  app.get("/user/:userTag/tag", FindOneByUserTag);
  app.get("/user/:email/email", [verifyToken, isAdmin], FindOneByEmail);
};

export default UserRoute;
