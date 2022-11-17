require("dotenv").config();
import Express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Database from "../models";

// Types
//import { User } from "../types/User";
import { RolesList } from "../types/Default";
import { Roles } from "../types/Roles";
import { postUserInContactList, sendConfirm } from "../functions/mailjet/main";

// Constants
import { MJ_CONTACTLIST_NEWSLETTER } from "../constants/mailjet";
import { makeWord } from "../tools/MakeWord";

const Op = Database.Sequelize.Op;

const Users = Database.users;
const Roles = Database.roles;

let password = makeWord(8);
let userTag = makeWord(6);

const include = ["@gmail.com", "@gmail.fr"];

const Signup = async (req: Express.Request, res: Express.Response) => {
  const { roles, email, newsletter, password } = req.body;
  const isDomain = include.map((e) => email.includes(e)).includes(true);

  const isUserTag = async () => {
    const res = await Users.findOne({
      where: {
        userTag: userTag,
      },
    });
    if (res) {
      return (userTag = makeWord(6));
    } else return userTag;
  };

  Users.create({
    ...req.body,
    userTag: await isUserTag(),
    password: bcrypt.hashSync(password, 8),
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
          user.setRoles(roles).then(async () => {
            if (newsletter) {
              await postUserInContactList(email, MJ_CONTACTLIST_NEWSLETTER);
            }
            if (!isDomain) {
              await sendConfirm("4318207", email, userTag).then(() => {
                res.send({ message: "User was registered successfully!" });
              });
            } else {
              res.send({
                message:
                  "Le domaine de votre email n'est pas accepté sur Meltrip",
              });
            }
          });
        });
      } else {
        user.setRoles([1]).then(async () => {
          if (newsletter) {
            await postUserInContactList(email, MJ_CONTACTLIST_NEWSLETTER);
          }
          if (!isDomain) {
            await sendConfirm("4318207", email, userTag).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          } else {
            res.send({
              message:
                "Le domaine de votre email n'est pas accepté sur Meltrip",
            });
          }
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
          // name: user.name,
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

const ForgotPassword = (req: Express.Request, res: Express.Response) => {
  const { email } = req.params;
  Users.findOne({
    where: {
      email: email,
    },
  })
    .then((data: any) => {
      Users.update(
        { ...req.body, password: bcrypt.hashSync(password, 8) },
        {
          where: { email: email },
        }
      ).then((num: number) => {
        if (num == 1) {
          sendConfirm("4318239", email, data.userTag, password).then(() => {
            res.send({
              message: "User was updated successfully.",
            });
          });
        } else {
          res.send({
            message:
              "Cannot update User with id=${id}. Maybe User was not found or req.body is empty!",
          });
        }
      });
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving user with email=" + email,
      });
    });
};

export { Signup, Signin, ForgotPassword };
