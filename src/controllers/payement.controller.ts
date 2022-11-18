import Express from "express";
import Database from "../models";

const Payement = Database.payements;

export const Create = (req: Express.Request, res: Express.Response) => {
  Payement.create({ ...req.body })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the Payement",
      });
    });
};
export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving Payement with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving Payement with id=" + id,
      });
    });
};
export const Update = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Payement was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Payement with id=${id}. Maybe Payement was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating Payement with id=" + id,
      });
    });
};
export const Delete = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.destroy({
    where: { id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Payement was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Payement with id=${id}. Maybe Payement was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Payement with id=" + id,
      });
    });
};
