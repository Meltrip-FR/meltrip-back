export const GroupModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "groups",
    {
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
