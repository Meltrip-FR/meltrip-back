export const PayementModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "payements",
    {
      urlPayement: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
