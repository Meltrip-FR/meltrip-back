import Database from "../models";

export const CleanDataBase = (force: boolean) => {
  // const dataRole = Database.ROLES;
  // const Role = Database.roles;

  //Clear all data in dataBase
  Database.sequelize
    .sync({ force })
    .then((e: any) => {
      console.log("Drop Database =>", e.connectionManager.config.database);
      console.log("Config Database =>", e.connectionManager.config);
      console.log("Tables models =>", e.models);
      // dataRole.map((name: string, index: number) =>
      //   Role.create({
      //     id: index + 1,
      //     name,
      //   })
      // );
    })
    .catch((error: any) => console.error(error));
};
