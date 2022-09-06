import Express from "express";
import Database from "../../models";
import { getPagination, getPagingData } from "../../utils/paginate";

// Controller
import { findOnebyName } from "./tag.controller";

// Types
import { Article } from "../../types/article";

const dbArticle = Database.article;
const Op = Database.Sequelize.Op;

export const createArticle = (
  req: Express.Request,
  res: Express.Response
): void => {
  const { title, description, text, slug, status, authorId, tagId } =
    req.body as Article;
  if (
    !title ||
    !description ||
    !text ||
    !slug ||
    !status ||
    !authorId ||
    !tagId
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  delete req.body.id;
  dbArticle
    .create({ ...req.body })
    .then((data: Article) => {
      return res.send(data);
    })
    .catch((error: any) => {
      return res.status(500).send({
        message:
          error.message || "Some error occured while creating the article",
      });
    });
};

export const findAllArticle = async (
  req: Express.Request<{ body: { tag: string } }>,
  res: Express.Response
) => {
  // Path = /blog/articles?tag=stringName
  const { tag } = req.body;
  if (tag) {
    return findOnebyName(tag).then((id) => {
      dbArticle
        .findAll({ where: { tagId: id } })
        .then((data: Article[]) => {
          return res.send(data);
        })
        .catch((error: TypeError) => {
          return res.status(500).send({
            message:
              error.message || "Some error occured while retrieving articles",
          });
        });
    });
  } else {
    return dbArticle
      .findAll()
      .then((data: any) => {
        return res.send(data);
      })
      .catch((error: any) => {
        return res.status(500).send({
          message:
            error.message || "Some error occured while retrieving articles",
        });
      });
  }
};

export const findPaginateArticle = (
  req: Express.Request,
  res: Express.Response
) => {
  const { page, size, id } = req.query;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  const { limit, offset } = getPagination(page, size);
  dbArticle
    .findAndCountAll({
      where: condition,
      limit,
      offset,
      attributes: ["id", "title", "description", "pictureURL"],
    })
    .then((data: Article[]) => {
      const response = getPagingData(data, page, limit);
      return res.send(response);
    })
    .catch((err: TypeError) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

export const findOneArticle = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  dbArticle
    .findByPk(id)
    .then((data: Article) => {
      return res.send(data);
    })
    .catch((error: TypeError) => {
      return res.status(500).send({
        message: "Error retrieving article with id=" + id,
      });
    });
};

export const updateArticle = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  dbArticle
    .update(req.body as Article, {
      where: { id: id },
    })
    .then((num: number) => {
      if (num == 1) {
        return res.send({
          message: "article was updated successfully.",
        });
      } else {
        return res.send({
          message:
            "Cannot update article with id=${id}. Maybe article was not found or req.body is empty!",
        });
      }
    })
    .catch((error: TypeError) => {
      return res.status(500).send({
        message: "Error updating article with id=" + id,
      });
    });
};

export const deleteArticle = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  dbArticle
    .destroy({
      where: { id: id },
    })
    .then((num: number) => {
      if (num == 1) {
        return res.send({
          message: "article was deleted successfully!",
        });
      } else {
        return res.send({
          message: `Cannot delete article with id=${id}. Maybe article was not found!`,
        });
      }
    })
    .catch((error: any) => {
      res.status(500).send({
        message: "Could not delete article with id=" + id,
      });
    });
};
