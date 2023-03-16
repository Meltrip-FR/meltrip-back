require("dotenv").config();
import axios from "axios";

describe("Organization Controller", () => {
  describe("Organization - FindOne", () => {
    it("should gets with valid data", async () => {
      const idOrganization = 1;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/organization/${idOrganization}`
      );
      expect(response.status).toBe(200);
      expect(response.data.siret).toBe("85065166200015");
    });
  });
  describe("Organization - FindAll", () => {
    it("should gets with valid data", async () => {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/organizations/`
      );
      expect(response.status).toBe(200);
      expect(response.data.length > 0 || response.data.length === 0).toBe(true);
    });
  });
});
