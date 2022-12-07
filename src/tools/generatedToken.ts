require("dotenv").config();
import axios from "axios";

const encode = (str: string): string =>
  Buffer.from(str, "binary").toString("base64");

export const generatedToken = async () => {
  const response: any = await axios
    .post(
      "https://api.insee.fr/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            encode(
              `${process.env.INSEE_CONSUMER_KEY}:${process.env.INSEE_CONSUMER_SECRET}`
            ),
        },
      }
    )
    .catch((e) => console.error(e));

  return response.data.access_token;
};
