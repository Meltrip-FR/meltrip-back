export const ArticleModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "article_images",
    {
      url: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["active", "disable"],
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
