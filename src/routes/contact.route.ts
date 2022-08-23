import * as core from "express-serve-static-core";
import { CreateContact } from "../controllers/contact.controller";

export const ContactRoute = (app: core.Express) => {
  app.post("/contact", CreateContact);
};
