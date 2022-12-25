import Database from "../../models";

const ROLES = Database.ROLES;
const Users = Database.users;
const Organizations = Database.organizations;
const Members = Database.members;

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

const checkDuplicateMember = (req: any, res: any, next: any) => {
  Members.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Member is already in use!",
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
  checkDuplicateMember,
  checkRolesExisted,
};
