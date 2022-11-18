import Database from "../../models";

const ROLES = Database.ROLES;
const Users = Database.users;
const Organizations = Database.organizations;
const Groups = Database.groups;

const checkDuplicateUsernameOrEmail = (req: any, res: any, next: any) => {
  // Email
  Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
    next();
  });
};

const checkDuplicateOrganization = (req: any, res: any, next: any) => {
  Organizations.findOne({
    where: {
      siret: req.body.siret,
    },
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Organization is already in use!",
      });
      return;
    }
    next();
  });
};

const checkDuplicateGroup = (req: any, res: any, next: any) => {
  Groups.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Group is already in use!",
      });
      return;
    }
    next();
  });
};

const checkRolesExisted = (req: any, res: any, next: any) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};

export const verifyData = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateOrganization,
  checkDuplicateGroup,
  checkRolesExisted,
};
