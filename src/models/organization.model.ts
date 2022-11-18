export const OrganizationModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "organizations",
    {
      siret: {
        type: Sequelize.STRING,
      },
      dateCreation: {
        type: Sequelize.DATE,
      },
      denominationUniteLegale: {
        type: Sequelize.STRING,
      },
      numeroVoie: {
        type: Sequelize.STRING,
      },
      typeVoie: {
        type: Sequelize.STRING,
      },
      voie: {
        type: Sequelize.STRING,
      },
      codePostal: {
        type: Sequelize.STRING,
      },
      commune: {
        type: Sequelize.STRING,
      },
      codeCommune: {
        type: Sequelize.STRING,
      },
      cedex: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
