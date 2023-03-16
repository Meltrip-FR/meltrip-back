require("dotenv").config();
import Mailjet from "node-mailjet";

export const MailjetConfig = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});
