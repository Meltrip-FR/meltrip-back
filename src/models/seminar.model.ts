export const SeminarModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "seminars",
    {
      adultNumber: {
        type: Sequelize.INTEGER,
      },
      adosNumber: { type: Sequelize.INTEGER },
      knowDate: {
        type: Sequelize.BOOLEAN,
      },
      departurePeriod: {
        type: Sequelize.STRING,
      },
      approximateDuration: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["Intégration", "Formation", "Management", "Commercial"],
      },
      destinationType: {
        type: Sequelize.ENUM,
        values: ["Mer", "Ville", "Montagne"],
      },
      budgetPerPerson: {
        type: Sequelize.INTEGER,
      },
      sleepSuggest: {
        type: Sequelize.STRING,
      },
      describeProject: {
        type: Sequelize.TEXT,
      },
      accompaniedSuggest: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
