export const PayementModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "payements",
    {
      payementIntent: {
        type: Sequelize.STRING,
      },
      urlPayement: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["", "En cours", "Refusé", "Accepté", "Terminé"],
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
