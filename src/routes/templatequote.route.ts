import Express from "express";
import {
  Create,
  FindOne,
  FindAll,
  Update,
  Delete,
} from "../controllers/templateQuote.controller";
import { isAdmin, verifyToken } from "./middleware/authJwt";

const TemplateQuoteRoute = (app: any) => {
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

  app.post("/templatequote", [verifyToken, isAdmin], Create);
  app.put("/templatequote/:id", [verifyToken, isAdmin], Update);
  app.delete("/templatequote/:id", [verifyToken, isAdmin], Delete);
  app.get("/templatequote/:id", [verifyToken, isAdmin], FindOne);
  app.get("/templatequotes", [verifyToken, isAdmin], FindAll);
};

export default TemplateQuoteRoute;
