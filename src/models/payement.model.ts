export const PayementModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "payements",
    {
      csId: {
        type: Sequelize.TEXT,
      },
      cusId: {
        type: Sequelize.TEXT,
      },
      payementIntent: {
        type: Sequelize.TEXT,
      },
      urlPayement: {
        type: Sequelize.TEXT,
      },
      urlInvoice: {
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
