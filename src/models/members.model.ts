export const MembersModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "members",
    {
      idGroup: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      present: {
        type: Sequelize.BOOLEAN,
      },
      resultState: {
        type: Sequelize.INTEGER,
      },
      resultType: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
