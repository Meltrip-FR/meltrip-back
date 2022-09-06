import Express from "express";
import bcrypt from "bcryptjs";

import Database from "../models";

const Users = Database.users;

export const UserBoard = (_req: Express.Request, res: Express.Response) => {
  res.status(200).send("User Content.");
};
export const AdminBoard = (_req: Express.Request, res: Express.Response) => {
  res.status(200).send("Admin Content.");
};
export const ModeratorBoard = (
  _req: Express.Request,
  res: Express.Response
) => {
  res.status(200).send("Moderator Content.");
};

export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Users.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving user with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Users.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving basket with id=" + id,
      });
    });
};

export const UpdateUser = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Users.update(
    { ...req.body, password: bcrypt.hashSync(req.body.password, 8) },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update User with id=${id}. Maybe User was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

export const DeleteUser = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Users.destroy({
    where: id,
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
