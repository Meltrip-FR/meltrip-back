require("dotenv").config();
import axios from "axios";

describe("Users Controller", () => {
  describe("User - Update", () => {
    it("should update a user with valid data", async () => {
      const idUser = 2;
      const data = {
        username: "Mathieu dolby",
        civility: "M.",
        email: "mathieu@yopmail.com",
        password: "Mathieu",
        phone: "0628736195",
        terms: true,
        newsletter: true,
        roles: ["user", "admin"],
      };

      const response = await axios.put(
        `${process.env.API_BASE_URL}/user/confirm/${idUser}`,
        data
      );
      expect(response.status).toBe(200);
      expect(response.data.message).toBe("User was updated successfully.");
    });
  });
});
