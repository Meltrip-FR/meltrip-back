import Express from "express";
import { VerifySignUp } from "./middleware/verifySignUp";
import { Signup, Signin } from "../controllers/auth.controller";

export const AuthRoute = (app: any) => {
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

  app.post("/auth/signin", Signin);
  app.post(
    "/auth/signup",
    [
      VerifySignUp.checkDuplicateUsernameOrEmail,
      VerifySignUp.checkRolesExisted,
    ],
    Signup
  );
};
