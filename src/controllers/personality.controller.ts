import Express from "express";
import Database from "../models";

const Personality = Database.personalitys;

export const Create = (req: Express.Request, res: Express.Response) => {
  Personality.create({ ...req.body })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the Personality",
      });
    });
};
export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Personality.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving Personality with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Personality.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving Personality with id=" + id,
      });
    });
};
export const Update = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Personality.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Personality was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Personality with id=${id}. Maybe Personality was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating Personality with id=" + id,
      });
    });
};
export const Delete = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Personality.destroy({
    where: { id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Personality was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Personality with id=${id}. Maybe Personality was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Personality with id=" + id,
      });
    });
};
