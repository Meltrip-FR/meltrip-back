import * as dotenv from "dotenv";
import Mailjet from "node-mailjet";

dotenv.config();

export const MailjetConfig = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});
