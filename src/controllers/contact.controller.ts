import Database from "../models";

const Contact = Database.contacts;

export const CreateContact = (req: any, res: any) => {
  Contact.create({ ...req.body })
    .then((item: any) => {
      console.log({ item });
      res.send({ message: "Contact was add successfully!" });
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
};
