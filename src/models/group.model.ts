export const GroupModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "groups",
    {
      idSeminar: {
        type: Sequelize.INTEGER,
      },
      idOrganization: {
        type: Sequelize.INTEGER,
      },
      financialEmail: {
        type: Sequelize.STRING,
      },
      financialPhone: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
