import Express from "express";
import Database from "../models";

const Groups = Database.groups;
const Members = Database.groups;

export const Create = (req: Express.Request, res: Express.Response) => {
  Groups.create({ ...req.body })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message: error.message || "Some error occured while creating the Group",
      });
    });
};
export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Groups.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving Groups with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Groups.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving Group with id=" + id,
      });
    });
};
export const FindAllByGroupId = (
  req: Express.Request,
  res: Express.Response
) => {
  const { id } = req.params;
  Members.findAll({ where: { groupId: id } })
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving Group with id=" + id,
      });
    });
};
export const Update = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Groups.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Group was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating Group with id=" + id,
      });
    });
};
export const Delete = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Groups.destroy({
    where: { id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Groups was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Groups with id=${id}. Maybe Groups was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Groups with id=" + id,
      });
    });
};
