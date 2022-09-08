import { CreateKeyAPI, FindOnebyKey } from "../controllers/api.controller";

export const KeyRoute = (app: any) => {
  app.get("/Key", CreateKeyAPI);
  app.get("/Key/:name", FindOnebyKey);
};
