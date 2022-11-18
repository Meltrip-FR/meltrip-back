import Database from "../models";
import { RolesList } from "../types/Default";

import bcrypt from "bcryptjs";

const CleanDataBase = (force: boolean) => {
  const Op = Database.Sequelize.Op;
  const dataRole = Database.ROLES;
  const Roles = Database.roles;
  const Users = Database.users;
  const listRoles = ["user", "admin"];

  //Clear all data in dataBase
  Database.sequelize.sync({ force }).then((e: any) => {
    console.log(e.connectionManager.config);
    console.log(
      "\x1b[33m%s\x1b[0m",
      `Executing (default): Drop Database ${e.connectionManager.config.database}`
    );
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Executing (default): Config Database ",
      e.connectionManager.config
    );
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Executing (default): Tables models ",
      e.models
    );

    // Create Role
    dataRole.map((name: string, index: number) =>
      //Create Roles
      Roles.create({
        id: index + 1,
        name,
      })
    );
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Executing (default): Roles has been created"
    );
    //Create user Admin
    Users.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD as string, 8),
      terms: true,
      newsletter: false,
      confirmEmail: true,
      roles: listRoles,
    })
      .then((user: any) => {
        Roles.findAll({
          where: {
            name: {
              [Op.or]: listRoles,
            },
          },
        }).then((roles: RolesList) => {
          user.setRoles(roles).then(async () => {
            console.log(
              "\x1b[33m%s\x1b[0m",
              "Executing (default): Admin has been created"
            );
          });
        });
      })
      .catch((error: any) => console.error(error));
  });
};

export default CleanDataBase;
