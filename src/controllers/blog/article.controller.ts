import Database from "../../models";
import { getPagination, getPagingData } from "../../utils/paginate";
import { findOnebyName } from "./tag.controller";

const Article = Database.article;
const Op = Database.Sequelize.Op;

export const createArticle = (req: any, res: any) => {
  const { title } = req.body;
  //!empty value
  if (!title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  Article.create({ ...req.body })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the article",
      });
    });
};

export const findAllArticle = async (req: any, res: any) => {
  const { tag } = req.query;
  if (tag) {
    return findOnebyName(tag).then((id) => {
      Article.findAll({ where: { tagId: id } })
        .then((data: any) => {
          return res.send(data);
        })
        .catch((error: any) => {
          return res.status(500).send({
            message:
              error.message || "Some error occured while retrieving articles",
          });
        });
    });
  } else {
    return Article.findAll()
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

export const findPaginateArticle = (req: any, res: any) => {
  const { page, size, id } = req.query;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  const { limit, offset } = getPagination(page, size);
  Article.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: ["id", "title", "description", "pictureURL"],
  })
    .then((data: any) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

export const findOneArticle = (req: any, res: any) => {
  const { id } = req.params;
  Article.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message: "Error retrieving article with id=" + id,
      });
    });
};

export const updateArticle = (req: any, res: any) => {
  const { id } = req.params;

  Article.update(req.body, {
    where: { id: id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "article was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update article with id=${id}. Maybe article was not found or req.body is empty!",
        });
      }
    })
    .catch((error: any) => {
      res.status(500).send({
        message: "Error updating article with id=" + id,
      });
    });
};

export const deleteArticle = (req: any, res: any) => {
  const { id } = req.params;
  Article.destroy({
    where: { id: id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "article was deleted successfully!",
        });
      } else {
        res.send({
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
