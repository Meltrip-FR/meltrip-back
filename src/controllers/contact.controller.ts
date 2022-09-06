import Express from "express";
import Database from "../models";

// Types
import { Contact } from "../types/Contact";

const Contact = Database.contacts;

export const CreateContact = (
  req: Express.Request,
  res: Express.Response
): void => {
  Contact.create({ ...req.body })
    .then((item: Contact) => {
      res.send({ message: "Contact was add successfully!" });
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
};
