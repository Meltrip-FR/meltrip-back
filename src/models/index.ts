require("dotenv").config();
import { Sequelize } from "sequelize";

import { UserModel } from "./user.model";
import { RoleModel } from "./role.model";
// import { ContactModel } from "./contact.model";
// import { TagModel } from "./blog/tag.model";
// import { ArticleModel } from "./blog/article.model";
// import { NewsletterModel } from "./newsletter.model";
// import { SeminarModel } from "./seminar.model";

//Connect to SQL database
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASSWORD as string,
  {
    host: DB_HOST as string,
    port: DB_PORT as any,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const Database: any = {};

// Build database
Database.Sequelize = Sequelize;
Database.sequelize = sequelize;

// Users && Token
Database.users = UserModel(sequelize, Sequelize);
Database.roles = RoleModel(sequelize, Sequelize);
Database.ROLES = ["user", "admin"];

// // Organizations
// Database.organizations = SeminarModel(sequelize, Sequelize);

// // Seminar
// Database.seminars = SeminarModel(sequelize, Sequelize);

// // Blogs
// Database.tag = TagModel(sequelize, Sequelize);
// Database.article = ArticleModel(sequelize, Sequelize);

// // Newsletter
// Database.newsletter = NewsletterModel(sequelize, Sequelize);

// //Contact
// Database.contacts = ContactModel(sequelize, Sequelize);

//Roles foreign_key [userId, roleId]
Database.users.belongsToMany(Database.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

//User_roles foreign_key [roleId, userId]
Database.roles.belongsToMany(Database.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

// //tags foreign_key [tagId]
// Database.article.belongsTo(Database.tag, {
//   through: "articles",
//   foreignKey: "tagId",
// });

export default Database;
