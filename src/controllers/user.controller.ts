import bcrypt from "bcryptjs";
import Database from "../models";

const Users = Database.users;

export const UserBoard = (req: any, res: any) => {
  res.status(200).send("User Content.");
};
export const AdminBoard = (req: any, res: any) => {
  res.status(200).send("Admin Content.");
};
export const ModeratorBoard = (req: any, res: any) => {
  res.status(200).send("Moderator Content.");
};

export const FindOne = (req: any, res: any) => {
  const { id } = req.params;
  Users.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        error,
        message: "Error retrieving user with id=" + id,
      });
    });
};
export const FindAll = (req: any, res: any) => {
  const { id } = req.params;
  Users.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message: error.message || "Error retrieving basket with id=" + id,
      });
    });
};

export const UpdateUser = (req: any, res: any) => {
  const { id } = req.params;
  Users.update(
    { ...req.body, password: bcrypt.hashSync(req.body.password, 8) },
    {
      where: { id: id },
    }
  )
    .then((num: any) => {
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
    .catch((error: any) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

export const DeleteUser = (req: any, res: any) => {
  const { id } = req.params;
  Users.destroy({
    where: id,
  })
    .then((num: any) => {
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
    .catch((error: any) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
