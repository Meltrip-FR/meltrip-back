export const SeminarModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "organizations",
    {
      type: {
        type: Sequelize.ENUM,
        value: ["company"],
      },
      billingManager: {
        type: Sequelize.BOOLEAN,
      },
      emailFinancial: {
        type: Sequelize.STRING,
      },
      numberFinancial: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
