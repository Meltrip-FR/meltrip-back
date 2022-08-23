export const ContactModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "contacts",
    {
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      describe: {
        type: Sequelize.TEXT,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
