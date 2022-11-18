import { CreateContact } from "../controllers/contact.controller";

const ContactRoute = (app: any) => {
  app.post("/contact", CreateContact);
};

export default ContactRoute;
