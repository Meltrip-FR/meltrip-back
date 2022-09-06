import Express from "express";
import {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
} from "./middleware/authJwt";
import {
  UserBoard,
  ModeratorBoard,
  AdminBoard,
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

  app.get("/users/", [verifyToken, isModeratorOrAdmin], FindAll);
  app.get("/user/", [verifyToken], UserBoard);
  app.get("/moderator/", [verifyToken, isModerator], ModeratorBoard);
  app.get("/administator/", [verifyToken, isAdmin], AdminBoard);
  app.get("/user/:id/", FindOne);
  app.put("/user/:id/", UpdateUser);
  app.delete("/user/:id", DeleteUser);
};
