require("dotenv").config();
import { Sequelize } from "sequelize";

import { UserModel } from "./user.model";
import { RoleModel } from "./role.model";
import { ContactModel } from "./contact.model";
import { TagModel } from "./blog/tag.model";
import { ArticleModel } from "./blog/article.model";
import { NewsletterModel } from "./newsletter.model";
import { SeminarModel } from "./seminar.model";
import { OrganizationModel } from "./organization.model";
import { GroupModel } from "./group.model";
import { PayementModel } from "./payement.model";
import { PersonalityModel } from "./personality.model";
import ForeignKey from "./foreignkey";
import { QuoteModel } from "./quote.model";
import { MembersModel } from "./members.model";

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

// Seminar
Database.seminars = SeminarModel(sequelize, Sequelize);
// Users && Token
Database.users = UserModel(sequelize, Sequelize);
Database.roles = RoleModel(sequelize, Sequelize);
Database.ROLES = ["user", "admin"];
// Organizations
Database.organizations = OrganizationModel(sequelize, Sequelize);
// Quote
Database.quotes = QuoteModel(sequelize, Sequelize);
// Payement
Database.payements = PayementModel(sequelize, Sequelize);
// Groups
Database.groups = GroupModel(sequelize, Sequelize);
// Members
Database.members = MembersModel(sequelize, Sequelize);
// Personality
Database.personality = PersonalityModel(sequelize, Sequelize);
// Blogs
Database.tags = TagModel(sequelize, Sequelize);
Database.articles = ArticleModel(sequelize, Sequelize);
// Newsletter
Database.newsletter = NewsletterModel(sequelize, Sequelize);
//Contact
Database.contacts = ContactModel(sequelize, Sequelize);

ForeignKey(Database);

export default Database;
