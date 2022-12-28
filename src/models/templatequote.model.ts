export const TemplateQuoteModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "templatequotes",
    {
      url: {
        type: Sequelize.STRING,
      },
      urlPicture: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
