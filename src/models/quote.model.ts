export const QuoteModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "quotes",
    {
      propose1: {
        type: Sequelize.STRING,
      },
      propose2: {
        type: Sequelize.STRING,
      },
      propose3: {
        type: Sequelize.STRING,
      },
      proposeSelect: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      idTemplateQuote1: {
        type: Sequelize.INTEGER,
      },
      idTemplateQuote2: {
        type: Sequelize.INTEGER,
      },
      idTemplateQuote3: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
