import Express from "express";
import Database from "../models";

// Types
import { Key } from "../types/Key";

const keyAPI = Database.keyAPI;

export const CreateKeyAPI = (
  _req: Express.Request,
  res: Express.Response
): void => {
  const r = (Math.random() + 1).toString(36);
  keyAPI
    .create({ key: r })
    .then((_item: Key) => {
      res.send({ message: "Key was add successfully!" });
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
};

export const FindOnebyKey = async (
  req: Express.Request,
  res: Express.Response
) => {
  return keyAPI
    .findOne({ where: { key: req.params.name } })
    .then((data: any) => {
      const { key } = data.dataValues;
      res.send(key);
    })
    .catch((error: TypeError) => {
      console.log({
        message: "Error retrieving Tag with name=" + error,
      });
    });
};
