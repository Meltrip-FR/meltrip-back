import Express from "express";
import jwt from "jsonwebtoken";
import Database from "../../models";

const Users = Database.users;

interface Props {
  id: number;
  iat: number;
  exp: number;
}

export const verifyToken = (
  req: Express.Request<Props>,
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
  req: Express.Request<Props>,
  res: Express.Response,
  next: Express.NextFunction
) => {
  let token = req.headers["x-access-token"] as string;
  const decoded = jwt.decode(token) as Props;
  Users.findByPk(decoded.id)
    .then((user: any) => {
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
    })
    .catch((_e: TypeError) => {
      res.status(403).send({
        message: "User not found !",
      });
    });
};
