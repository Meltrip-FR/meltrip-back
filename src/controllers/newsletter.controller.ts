import Express from "express";
import { postUserInContactList } from "../functions/mailjet/main";
import Database from "../models";

// Constant
import { MJ_CONTACTLIST_NEWSLETTER } from "../constants/mailjet";

const dbNewsletter = Database.article;

export const SigninNewsletter = (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    dbNewsletter
      .create({ ...req.body })
      .then((data: any) => {
        res.send(data);
      })
      .catch((error: any) => {
        res.status(500).send({
          message:
            error.message || "Some error occured while creating the article",
        });
      });

    postUserInContactList(req.body.email, MJ_CONTACTLIST_NEWSLETTER).then(
      () => {
        res.send({ message: "User was registered successfully!" });
      }
    );
  } catch (error: any) {
    res.send(error);
  }
};
