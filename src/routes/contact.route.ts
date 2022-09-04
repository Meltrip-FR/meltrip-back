import { CreateContact } from "../controllers/contact.controller";

export const ContactRoute = (app: any) => {
  app.post("/contact", CreateContact);
};
