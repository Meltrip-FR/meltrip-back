require("dotenv").config();
import axios from "axios";

describe("Payment Controller", () => {
  describe("Payment - Create", () => {
    it("should create a payment with valid data", async () => {
      const idPayement = 1;
      const data = {
        idSeminar: 1,
        nameDevis: "title",
        unitAmount: 70000,
      };

      const response = await axios.put(
        `${process.env.API_BASE_URL}/payement/${idPayement}`,
        data
      );
      expect(response.status).toBe(200);
    });
  });
  // describe("Payment - Delete", () => {
  //   it("should delete a payment with valid data", async () => {
  //     const idPayement = 1;
  //     const response = await axios.delete(
  //       `${process.env.API_BASE_URL}/payement/${idPayement}`
  //     );
  //     expect(response.status).toBe(200);
  //   });
  // });
  describe("Payment - FindOne", () => {
    it("should get a payment with valid data", async () => {
      const idPayement = 1;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/payement/${idPayement}`
      );
      expect(response.status).toBe(200);
    });
  });
  describe("Payment - FindAll", () => {
    it("should get all payments with valid data", async () => {
      const response = await axios.get(`${process.env.API_BASE_URL}/payements`);
      expect(response.status).toBe(200);
    });
  });
  describe("Payment - buyByStripe", () => {
    it("should buy a payment with valid data", async () => {
      const data = {
        idSeminar: 1,
        nameDevis: "mama",
        unitAmount: 500,
      };

      const response = await axios.post(
        `${process.env.API_BASE_URL}/payement`,
        data
      );
      expect(response.status).toBe(200);
      expect(response.data.urlPayement).toBeTruthy();
    });
  });
});
