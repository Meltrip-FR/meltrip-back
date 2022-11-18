export const PersonalityModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "personality",
    {
      idGroup: {
        type: Sequelize.INTEGER,
      },
      question1: {
        type: Sequelize.STRING,
      },
      question2: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
