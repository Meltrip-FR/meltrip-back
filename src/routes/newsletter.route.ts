import Express from "express";
import { SigninNewsletter } from "../controllers/newsletter.controller";

const NewsletterRoute = (app: Express.Application) => {
  app.post("/newsletter", SigninNewsletter);
};

export default NewsletterRoute;
