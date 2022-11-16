import { VerifySignUp } from "./middleware/verifySignUp";
import { Signup, Signin, ForgotPassword } from "../controllers/auth.controller";

export const AuthRoute = (app: any) => {
  app.post("/auth/signin", Signin);
  app.post(
    "/auth/signup",
    [
      VerifySignUp.checkDuplicateUsernameOrEmail,
      VerifySignUp.checkRolesExisted,
    ],
    Signup
  );
  app.get("/auth/forgotpassword/:email", ForgotPassword);
};
