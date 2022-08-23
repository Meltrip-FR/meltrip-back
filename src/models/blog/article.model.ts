export const ArticleModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "articles",
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.TEXT,
      },
      pictureURL: {
        type: Sequelize.TEXT,
      },
      slug: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      authorId: {
        type: Sequelize.INTEGER,
      },
      tagId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
