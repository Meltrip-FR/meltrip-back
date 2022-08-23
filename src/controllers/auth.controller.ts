require("dotenv").config();
import Database from "../models";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Op = Database.Sequelize.Op;

const Users = Database.users;
const Roles = Database.roles;

const Signup = (req: any, res: any) => {
  // Save User to Database
  Users.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 8) })
    .then((user: any) => {
      if (req.body.roles) {
        Roles.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles: any) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
};

const Signin = (req: any, res: any) => {
  Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user: any) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
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
      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
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
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
};

export { Signup, Signin };
