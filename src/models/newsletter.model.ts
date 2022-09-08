export const NewsletterModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define("newsletter", {
    email: {
      type: Sequelize.STRING,
    },
  });
};
