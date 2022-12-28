import Express from "express";
import Database from "../models";

const Quote = Database.templatequotes;

export const Create = (req: Express.Request, res: Express.Response) => {
  Quote.create({
    ...req.body,
  })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message:
          error.message ||
          "Some error occured while creating the template quote",
      });
    });
};
export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Quote.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving template Quote with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Quote.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message:
          error.message || "Error retrieving template quote with id=" + id,
      });
    });
};
export const Update = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Quote.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "template quote was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update template quote with id=${id}. Maybe quote was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating template quote with id=" + id,
      });
    });
};
export const Delete = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Quote.destroy({
    where: { id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Template Quote was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Template Quote with id=${id}. Maybe Quote was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Quote with id=" + id,
      });
    });
};
