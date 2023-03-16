require("dotenv").config();
import axios from "axios";

describe("Seminars Controller", () => {
  describe("Seminar - FindOne", () => {
    it("should get a seminar with valid data", async () => {
      const idSeminar = 2;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/seminar/${idSeminar}`
      );
      expect(response.status).toBe(200);
    });
  });
});
