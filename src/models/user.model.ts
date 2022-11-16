export const UserModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "users",
    {
      userTag: {
        type: Sequelize.STRING,
      },
      civility: {
        type: Sequelize.ENUM,
        value: ["Mme", "M."],
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      confirmEmail: {
        type: Sequelize.BOOLEAN,
      },
      terms: {
        type: Sequelize.BOOLEAN,
      },
      newsletter: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
