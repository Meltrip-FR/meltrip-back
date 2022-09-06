import Express from "express";
import Database from "../../models";

// Types
import { Tag } from "../../types/tag";

const dbTag = Database.tag;
const Op = Database.Sequelize.Op;

export const toNormalForm = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const createTag = <T>(
  req: Express.Request<T>,
  res: Express.Response
): void => {
  const { name, slug } = req.body;
  if (!name || !slug) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  delete req.body.id;
  dbTag
    .create({ name, slug: toNormalForm(slug.toLowerCase()) })
    .then((data: Tag) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      return res.status(500).send({
        message: error.message || "Some error occured while creating the Tag",
      });
    });
};

export const findAllTag = <T>(
  req: Express.Request<T>,
  res: Express.Response
) => {
  const { name } = req.query;

  let condition = name && { name: { [Op.like]: `%${name}%` } };
  dbTag
    .findAll({ where: condition })
    .then((data: Tag) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Some error occured while retrieving Tags",
      });
    });
};

export const findOneTag = <T>(
  req: Express.Request<T>,
  res: Express.Response
) => {
  const { id } = req.params as any;
  console.log(id);
  dbTag
    .findByPk(id)
    .then((data: Tag) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: "Error retrieving Tag with id=" + id,
      });
    });
};

export const findOnebyName = async (value: string) => {
  return dbTag
    .findOne({ where: { name: value } })
    .then((data: Tag) => {
      return data.id;
    })
    .catch((error: TypeError) => {
      console.log({
        message: "Error retrieving Tag with name=" + error,
      });
    });
};

export const updateTag = <T>(
  req: Express.Request<T>,
  res: Express.Response
) => {
  const { id } = req.params as any;
  dbTag
    .update(req.body as Tag, {
      where: { id },
    })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Tag was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Tag with id=${id}. Maybe Tag was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating Tag with id=" + id,
      });
    });
};

export const deleteTag = <T>(
  req: Express.Request<T>,
  res: Express.Response
) => {
  const { id } = req.params as any;
  dbTag
    .destroy({
      where: { id },
    })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Tag was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id,
      });
    });
};
