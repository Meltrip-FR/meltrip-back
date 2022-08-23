import Database from "../../models";

const Tag = Database.tag;
const Op = Database.Sequelize.Op;

export const toNormalForm = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const createTag = (req: any, res: any) => {
  const { name, slug } = req.body;
  if (!name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Tag.create({ name, slug: toNormalForm(slug.toLowerCase()) })
    .then((data: any) => {
      return res.send(data);
    })
    .catch((error: any) => {
      return res.status(500).send({
        message: error.message || "Some error occured while creating the Tag",
      });
    });
};

export const findAllTag = (req: any, res: any) => {
  const { name } = req.query;

  let condition = name && { name: { [Op.like]: `%${name}%` } };
  Tag.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message: error.message || "Some error occured while retrieving Tags",
      });
    });
};

export const findOneTag = (req: any, res: any) => {
  const { id } = req.params;
  console.log(id);
  Tag.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message: "Error retrieving Tag with id=" + id,
      });
    });
};

export const findOnebyName = async (value: string) => {
  return Tag.findOne({ where: { name: value } })
    .then((data: any) => {
      return data.id;
    })
    .catch((error: any) => {
      console.log({
        message: "Error retrieving Tag with name=" + error,
      });
    });
};

export const updateTag = (req: any, res: any) => {
  const { id } = req.params;

  Tag.update(req.body, {
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
    .catch((error: any) => {
      res.status(500).send({
        message: "Error updating Tag with id=" + id,
      });
    });
};

export const deleteTag = (req: any, res: any) => {
  const { id } = req.params;

  Tag.destroy({
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
    .catch((error: any) => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id,
      });
    });
};
