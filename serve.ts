require("dotenv").config();
import Express from "express";
import cors from "cors";
// import fileupload from "express-fileupload";

import CleanDataBase from "./src/tools/cleanDatabase";

// Routes
import AuthRoute from "./src/routes/auth.route";
import UserRoute from "./src/routes/user.route";
import ContactRoute from "./src/routes/contact.route";
import BlogRoute from "./src/routes/blog.route";
import NewsletterRoute from "./src/routes/newsletter.route";
import SeminarRoute from "./src/routes/seminar.route";
import OrganizationRoute from "./src/routes/organization.route";

// Constant
let { PORT } = process.env;

const app: Express.Application = Express();

app.use(cors());
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
app.use(Express.json({ limit: "50mb" }));
// app.use(fileupload());

// Sequelize
CleanDataBase(true); //Remove Database: true || false

// Imports Routes
AuthRoute(app);
UserRoute(app);
SeminarRoute(app);
OrganizationRoute(app);
BlogRoute(app);
NewsletterRoute(app);
ContactRoute(app);

//Define Project API
app.get("/", (_req: Express.Request, res: Express.Response) => {
  res.json({ message: "Welcome to MELTRIP application." });
});

app.listen(PORT, () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Executing (default): App listening on PORT ${PORT}`
  );
});
