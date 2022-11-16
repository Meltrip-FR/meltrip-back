import { MailjetConfig } from "../../config/mailjet.config";
import * as dotenv from "dotenv";

dotenv.config();

const contactslist = MailjetConfig.post("contact", {
  version: "v3",
});

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

export const sendConfirm = async (
  templateID: string,
  email: string,
  userTag?: string,
  password?: string
) => {
  await MailjetConfig.post("send", {
    version: "v3.1",
  }).request({
    Messages: [
      {
        From: {
          Email: "mathieu@meltrip.fr",
          Name: "MELTRIP",
        },
        To: [
          {
            Email: email,
          },
        ],
        TemplateID: parseInt(templateID),
        TemplateLanguage: true,
        Variables: {
          usertag: userTag ? userTag : "",
          password: password ? password : "",
        },
        Subject: "Your Meltrip's confirm account",
      },
    ],
  });
};
