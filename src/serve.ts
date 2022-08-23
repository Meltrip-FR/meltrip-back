require("dotenv").config();
import * as functions from "firebase-functions";
import * as core from "express-serve-static-core";
import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";

import { CleanDataBase } from "./tools/cleanDatabase";
import Database from "./models";

// Routes
import { AuthRoute } from "./routes/auth.route";
import { UserRoute } from "./routes/user.route";
import { ContactRoute } from "./routes/contact.route";
import { BlogRoute } from "./routes/blog.route";

// Constant
let { PORT } = process.env;

const app: core.Express = express();
const main: core.Express = express();

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(fileupload());

//Sequelize
CleanDataBase(false); //Remove Database: true || false
Database.sequelize.sync();

//Imports Routes
AuthRoute(app);
UserRoute(app);
ContactRoute(app);
BlogRoute(app);

//Define Project API
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MELTRIP application." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export const webApi = functions.https.onRequest(main);
