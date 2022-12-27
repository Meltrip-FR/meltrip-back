const ForeignKey = (Database: any) => {
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

  //Users foreign_key [idOrganization]
  Database.users.belongsTo(Database.organizations, {
    through: "users",
    foreignKey: "idOrganization",
  });

  //Articles foreign_key [user, userId]
  Database.articles.belongsTo(Database.tags, {
    through: "articles",
    foreignKey: "tagId",
  });
  //Articles foreign_key [user, authorId]
  Database.articles.belongsTo(Database.users, {
    through: "articles",
    foreignKey: "authorId",
  });

  //Seminars foreign_key []
  Database.seminars.belongsTo(Database.users, {
    through: "seminars",
    foreignKey: "idUser",
  });
  //Seminars foreign_key []
  Database.seminars.belongsTo(Database.organizations, {
    through: "seminars",
    foreignKey: "idOrganization",
  });
  //Seminars foreign_key []
  Database.seminars.belongsTo(Database.groups, {
    through: "seminars",
    foreignKey: "idGroup",
  });
  //Seminars foreign_key []
  Database.seminars.belongsTo(Database.payements, {
    through: "seminars",
    foreignKey: "idPayement",
  });
  //Seminars foreign_key []
  Database.seminars.belongsTo(Database.quotes, {
    through: "seminars",
    foreignKey: "idQuote",
  });

  //Members foreign_key []
  Database.members.belongsTo(Database.groups, {
    through: "members",
    foreignKey: "idGroup",
  });

  //Personality foreign_key []
  Database.personality.belongsTo(Database.members, {
    through: "personality",
    foreignKey: "idMember",
  });
};

export default ForeignKey;
