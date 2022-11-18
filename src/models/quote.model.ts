export const QuoteModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "quotes",
    {
      idSeminar: {
        type: Sequelize.INTEGER,
      },
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
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};