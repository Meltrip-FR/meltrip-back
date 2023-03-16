// app.put("/member/:id", Update);
// app.delete("/member/:id", Delete);
// app.get("/member/:id", FindOne);
// app.get("/members", FindAll);

require("dotenv").config();
import axios from "axios";

describe("Members Controller", () => {
  describe("members - Update", () => {
    it("should update a members with valid data", async () => {
      const idMember = 1;
      const data = {
        siret: "42878504200105",
        dateCreation: "2013-04-15",
        denominationUniteLegale: "AMAZON FRANCE LOGISTIQUE SAS",
        numeroVoie: "67",
        typeVoie: "BD",
        voie: "DU GENERAL LECLERC",
        codePostal: "92110",
        commune: "CLICHY",
        codeCommune: "92024",
        cedex: null,
      };

      const response = await axios.put(
        `${process.env.API_BASE_URL}/member/${idMember}`,
        data
      );
      expect(response.status).toBe(200);
    });
  });
  // describe("Members - Delete", () => {
  //   it("should delete a members with valid data", async () => {
  //     const idMember = 1;
  //     const response = await axios.delete(
  //       `${process.env.API_BASE_URL}/member/${idMembers}`
  //     );
  //     expect(response.status).toBe(200);
  //   });
  // });
  describe("Members - FindOne", () => {
    it("should get a members with valid data", async () => {
      const idMember = 1;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/member/${idMember}`
      );
      expect(response.status).toBe(200);
    });
  });

  describe("Members - FindAll", () => {
    it("should get all members with valid data", async () => {
      const response = await axios.get(`${process.env.API_BASE_URL}/members`);
      expect(response.status).toBe(200);
    });
  });
});
