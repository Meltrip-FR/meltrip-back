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
