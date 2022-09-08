import Express from "express";
import jwt from "jsonwebtoken";

import Database from "../../models";
import { User } from "../../types/User";

const dbUser = Database.users;

export const verifyToken = (
  req: Express.Request<{ body: { userId: number } }>,
  res: Express.Response,
  next: Express.NextFunction
): void => {
  let token = req.headers["x-access-token"] as string;
  if (!token) {
    res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(
    token,
    process.env.AUTH_SECRET as string,
    (err: any, decoded: any): void => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.body.userId = decoded.id;
      next();
    }
  );
};

export const isAdmin = (
  req: Express.Request<{ body: { userId: number } }>,
  res: Express.Response,
  next: Express.NextFunction
) => {
  dbUser.findByPk(req.body.userId).then((user: any) => {
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

export const isModerator = (
  req: Express.Request<{ body: { userId: number } }>,
  res: Express.Response,
  next: Express.NextFunction
) => {
  dbUser.findByPk(req.body.userId).then((user: any) => {
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

export const isModeratorOrAdmin = (
  req: Express.Request<{ body: { userId: number } }>,
  res: Express.Response,
  next: Express.NextFunction
) => {
  dbUser.findByPk(req.body.userId).then((user: User) => {
    dbUser.getRoles().then((roles: any) => {
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
