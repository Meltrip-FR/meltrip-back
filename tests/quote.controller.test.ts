require("dotenv").config();
import axios from "axios";

describe("Quotes Controller", () => {
  describe("Quote - Create", () => {
    it("should create a quote with valid data", async () => {
      const data = {
        price: 0,
        proposeSelect: "",
        propose1: "/pdf/dxzinezi",
        propose2: "/pdf/dxzini",
        propose3: "/pdf/dxzinezi",
        idTemplateQuote1: 1,
        idTemplateQuote2: 1,
        idTemplateQuote3: 1,
      };
      const response = await axios.post(
        `${process.env.API_BASE_URL}/quote`,
        data
      );
      expect(response.status).toBe(200);
      expect(response.data.id).toBeTruthy();
    });
  });
  describe("Quote - Update", () => {
    it("should update a quote with valid data", async () => {
      const idQuote = 1;
      const data = {
        price: 0,
        proposeSelect: "",
        propose1: "/pdf/dxzinezi",
        propose2: "/pdf/dxzini",
        propose3: "/pdf/dxzinezi",
        idTemplateQuote1: 1,
        idTemplateQuote2: 1,
        idTemplateQuote3: 1,
      };
      const response = await axios.put(
        `${process.env.API_BASE_URL}/quote/${idQuote}`,
        data
      );
      expect(response.status).toBe(200);
      expect(response.data.message).toBe("quote was updated successfully.");
    });
  });
  // describe("Quote - Delete", () => {
  //   it("should delete a quote with valid data", async () => {
  //     const idQuote = 1;
  //     const response = await axios.delete(
  //       `${process.env.API_BASE_URL}/quote/${idQuote}`
  //     );
  //     expect(response.status).toBe(200);
  //   });
  // });
  describe("Quote - FindOne", () => {
    it("should get a quote with valid data", async () => {
      const idQuote = 1;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/quote/${idQuote}`
      );
      expect(response.status).toBe(200);
    });
  });
  describe("Quote - FindAll", () => {
    it("should get quotes with valid data", async () => {
      const response = await axios.get(`${process.env.API_BASE_URL}/quotes/`);
      expect(response.status).toBe(200);
      expect(response.data.length > 0 || response.data.length === 0).toBe(true);
    });
  });
});
