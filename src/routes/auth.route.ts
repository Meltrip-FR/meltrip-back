import { verifyData } from "./middleware/verifyData";
import { Signup, Signin, ForgotPassword } from "../controllers/auth.controller";

const AuthRoute = (app: any) => {
  app.get("/auth/forgotpassword/:email", ForgotPassword);
  app.post("/auth/signin", Signin);
  app.post(
    "/auth/signup",
    [verifyData.checkDuplicateUsernameOrEmail, verifyData.checkRolesExisted],
    Signup
  );
};

export default AuthRoute;
