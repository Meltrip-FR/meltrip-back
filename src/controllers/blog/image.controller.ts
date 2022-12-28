import Database from "../../models";

const Image = Database.image;

export const createImage = (req: any, res: any) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Image.create({ name })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message: error.message || "Some error occured while creating the Tag",
      });
    });
};

export const findOneImage = (req: any, res: any) => {
  const { id } = req.params;
  Image.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message: "Error retrieving Tag with id=" + id,
      });
    });
};

export const deleteImage = (req: any, res: any) => {
  const { id } = req.params;

  Image.destroy({
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
