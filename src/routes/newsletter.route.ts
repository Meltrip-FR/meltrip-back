import Express from "express";
import { SigninNewsletter } from "../controllers/newsletter.controller";

export const NewsletterRoute = (app: Express.Application) => {
  app.post("/newsletter", SigninNewsletter);
};
