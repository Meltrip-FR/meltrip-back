export const KeyModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define("keys", {
    key: {
      type: Sequelize.STRING,
    },
  });
};
