require("dotenv").config();
import axios from "axios";

describe("CONTACT Controller", () => {
  describe("Contact - CREATE", () => {
    it("should create form contact with valid data", async () => {
      const data = {
        username: "Mathieu dolby",
        email: "mathieu@yopmail.com",
        title: "Merci Meltrip ",
        describe: "Merci beaucoup ! super service !",
      };
      const response = await axios.post(
        `${process.env.API_BASE_URL}/contact`,
        data
      );
      expect(response.status).toBe(200);
    });
  });
});
