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
      present: {
        type: Sequelize.BOOLEAN,
      },
      email: {
        type: Sequelize.STRING,
      },
      resultTest: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
