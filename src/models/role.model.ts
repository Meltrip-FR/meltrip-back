export const RoleModel = (sequelize: any, Sequelize: any) => {
  return sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.ENUM,
      values: ["user", "admin"],
    },
  });
};
