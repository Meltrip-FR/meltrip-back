import { VerifySignUp } from "./middleware/verifySignUp";
import { Signup, Signin, ForgotPassword } from "../controllers/auth.controller";

const AuthRoute = (app: any) => {
  app.get("/auth/forgotpassword/:email", ForgotPassword);
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

export default AuthRoute;
