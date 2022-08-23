import * as core from "express-serve-static-core";
import { VerifySignUp } from "./middleware/verifySignUp";
import { Signup, Signin } from "../controllers/auth.controller";

export const AuthRoute = (app: core.Express) => {
  app.use((req: any, res: any, next: any) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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
