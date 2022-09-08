require("dotenv").config();
import Express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Database from "../models";

// Types
import { RolesList } from "../types/Default";
import { Roles } from "../types/Roles";
import { addInMailjet } from "../functions/mailjet";
//import { User } from "../types/User";

const Op = Database.Sequelize.Op;

const dbUsers = Database.users;
const dbRoles = Database.roles;

const Signup = (req: Express.Request, res: Express.Response) => {
  // Save User to Database
  dbUsers
    .create({ ...req.body, password: bcrypt.hashSync(req.body.password, 8) })
    .then((user: any) => {
      if (req.body.roles) {
        dbRoles
          .findAll({
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          })
          .then((roles: RolesList) => {
            user.setRoles(roles).then(() => {
              if (req.body.newsletter) {
                addInMailjet(req.body.email).then(() => {
                  res.send({ message: "User was registered successfully!" });
                });
              }
            });
          });
      } else {
        user.setRoles([1]).then(() => {
          if (req.body.newsletter) {
            addInMailjet(req.body.email).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          }
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err: TypeError) => {
      res.status(500).send({ message: err.message });
    });
};

const Signin = (req: Express.Request, res: Express.Response) => {
  dbUsers
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user: any): void => {
      if (!user) {
        res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.AUTH_SECRET as string,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      const authorities: any = [];
      user.getRoles().then((roles: Roles[]) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(("ROLE_" + roles[i].name).toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err: TypeError) => {
      res.status(500).send({ message: err.message });
    });
};

export { Signup, Signin };
