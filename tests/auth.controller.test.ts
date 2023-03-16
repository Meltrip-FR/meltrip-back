require("dotenv").config();
import axios from "axios";

describe("Auth Controller", () => {
  // describe("Signup", () => {
  //   it("should create a new user with valid data", async () => {
  //     const userData = {
  //       username: "test",
  //       civility: "M.",
  //       email: "testjeslaat@example.com",
  //       password: "testpassword",
  //       phone: "0628736195",
  //       terms: true,
  //       newsletter: true,
  //       idOrganization: 1,
  //       roles: ["user"],
  //     };
  //     try {
  //       const response = await axios.post(
  //         `${process.env.API_BASE_URL}/auth/signup`,
  //         userData
  //       );
  //       expect(response.status).toBe(200);
  //       expect(JSON.stringify(response.data.message)).toBe(
  //         "User was registered successfully!"
  //       );
  //     } catch (error: any) {
  //       expect(error.response.status).toBe(400);
  //       expect(error.response.data.message).toBe(
  //         "Failed! Email is already in use!"
  //       );
  //     }
  //   });
  // });

  describe("Signin", () => {
    it("should authenticate a user with valid credentials", async () => {
      const credentials = {
        email: "admin@meltrip.fr",
        password: "adminadmin",
      };

      const response = await axios.post(
        `${process.env.API_BASE_URL}/auth/signin`,
        credentials
      );
      expect(response.status).toBe(200);
      expect(response.data.accessToken).toBeTruthy();
      expect(response.data.roles).toContain("ROLE_USER");
    });
  });
});
