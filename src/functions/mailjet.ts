import { MailjetConfig } from "../config/mailjet.config";
import * as dotenv from "dotenv";

dotenv.config();

const contactslist = MailjetConfig.post("contact", {
  version: "v3",
});

export const addInMailjet = async (email: string) => {
  await contactslist.action("managemanycontacts").request({
    Contacts: [{ Email: email }],
    ContactsLists: [
      {
        Action: "addnoforce",
        ListID: 10240822,
      },
    ],
  });
};
