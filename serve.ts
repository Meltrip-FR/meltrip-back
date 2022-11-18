require("dotenv").config();
import Express from "express";
import cors from "cors";
// import fileupload from "express-fileupload";

import CleanDataBase from "./src/tools/cleanDatabase";

// Routes
// import { AuthRoute } from "./src/routes/auth.route";
// import { UserRoute } from "./src/routes/user.route";
// import { ContactRoute } from "./src/routes/contact.route";
// import { BlogRoute } from "./src/routes/blog.route";
// import { NewsletterRoute } from "./src/routes/newsletter.route";

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
// AuthRoute(app);
// NewsletterRoute(app);
// UserRoute(app);
// ContactRoute(app);
// BlogRoute(app);

//Define Project API
app.get("/", (_req: Express.Request, res: Express.Response) => {
  res.json({ message: "Welcome to MELTRIP application." });
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
