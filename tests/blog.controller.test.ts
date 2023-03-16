//   app.get("/blog/article/:id", findOneArticle);
//   app.get("/blog/articles/", findAllArticle);
//   app.get("/blog/articlesPaginate/", findPaginateArticle);
//   app.get("/blog/tag/:id", findOneTag);
//   app.get("/blog/tags/", findAllTag);

require("dotenv").config();
import axios from "axios";

describe("BLOG Controller", () => {
  describe("BLOG - findOneArticle", () => {
    it("should gets with valid data", async () => {
      const idBLOG = 1;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/blog/article/${idBLOG}`
      );
      expect(response.status).toBe(200);
    });
  });
  describe("BLOG - findAllArticle", () => {
    it("should gets with valid data", async () => {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/blog/articles/`
      );
      expect(response.status).toBe(200);
    });
  });
  describe("BLOG - findPaginateArticle", () => {
    it("should gets with valid data", async () => {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/blog/articlesPaginate/`
      );
      expect(response.status).toBe(200);
    });
  });
  describe("BLOG - findOneTag", () => {
    it("should gets with valid data", async () => {
      const idTag = 1;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/blog/tag/${idTag}`
      );
      expect(response.status).toBe(200);
    });
  });
  describe("BLOG - findAllTag", () => {
    it("should gets with valid data", async () => {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/blog/tags/`
      );
      expect(response.status).toBe(200);
    });
  });
});
