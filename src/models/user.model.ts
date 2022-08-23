export const UserModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "users",
    {
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
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
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      firebasePictureId: {
        type: Sequelize.STRING,
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
