export const TagModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define(
    "tags",
    {
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
