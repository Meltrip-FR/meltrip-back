export const PayementModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "payements",
    {
      payementIntent: {
        type: Sequelize.STRING,
      },
      urlPayement: {
        type: Sequelize.STRING,
      },
      paye: {
        type: Sequelize.BOOLEAN,
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
