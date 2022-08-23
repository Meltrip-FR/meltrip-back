import jwt from "jsonwebtoken";
import Database from "../../models";

const Users = Database.users;

export const verifyToken = (req: any, res: any, next: any) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(
    token,
    process.env.AUTH_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    }
  );
};

export const isAdmin = (req: any, res: any, next: any) => {
  Users.findByPk(req.userId).then((user: any) => {
    user.getRoles().then((roles: any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

export const isModerator = (req: any, res: any, next: any) => {
  Users.findByPk(req.userId).then((user: any) => {
    user.getRoles().then((roles: any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

export const isModeratorOrAdmin = (req: any, res: any, next: any) => {
  Users.findByPk(req.userId).then((user: any) => {
    user.getRoles().then((roles: any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};
