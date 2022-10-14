import { MailjetConfig } from "../config/mailjet.config";
import * as dotenv from "dotenv";

dotenv.config();

const contactslist = MailjetConfig.post("contact", {
  version: "v3",
});
10240822;
export const postUserInContactList = async (
  email: string,
  idContactList?: string
) => {
  await contactslist.action("managemanycontacts").request({
    Contacts: [{ Email: email }],
    ContactsLists: [
      {
        Action: "addnoforce",
        ListID: parseInt(idContactList!),
      },
    ],
  });
};
