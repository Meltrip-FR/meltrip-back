require("dotenv").config();
import Express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Database from "../models";

// Types
//import { User } from "../types/User";
import { RolesList } from "../types/Default";
import { Roles } from "../types/Roles";
import { postUserInContactList } from "../functions/mailjet";

// Constants
import { MJ_CONTACTLIST_NEWSLETTER } from "../constants/mailjet";

const Op = Database.Sequelize.Op;

const Users = Database.users;
const Roles = Database.roles;

const Signup = (req: Express.Request, res: Express.Response) => {
  const { roles, email, newsletter } = req.body;
  // Save User to Database
  Users.create({
    ...req.body,
    //password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user: any) => {
      if (roles) {
        Roles.findAll({
          where: {
            name: {
              [Op.or]: roles,
            },
          },
        }).then((roles: RolesList) => {
          user.setRoles(roles).then(() => {
            if (newsletter) {
              postUserInContactList(email, MJ_CONTACTLIST_NEWSLETTER).then(
                () => {
                  res.send({ message: "User was registered successfully!" });
                }
              );
            }
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          if (newsletter) {
            postUserInContactList(email, MJ_CONTACTLIST_NEWSLETTER).then(() => {
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
  Users.findOne({
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
