import Express from "express";
import Database from "../models";

const Members = Database.members;

export const Create = (req: Express.Request, res: Express.Response) => {
  Members.create({ ...req.body })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the organization",
      });
    });
};
export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Members.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving Members with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Members.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving organization with id=" + id,
      });
    });
};
export const Update = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Members.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Organization was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Organization with id=${id}. Maybe Organization was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating Organization with id=" + id,
      });
    });
};
export const Delete = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Members.destroy({
    where: { id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Members was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Members with id=${id}. Maybe Members was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Members with id=" + id,
      });
    });
};
