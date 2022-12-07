import Express from "express";
import { isAdmin, verifyToken } from "./middleware/authJwt";
import {
  createArticle,
  findOneArticle,
  updateArticle,
  deleteArticle,
  findPaginateArticle,
  findAllArticle,
} from "../controllers/blog/article.controller";
import {
  createTag,
  findAllTag,
  findOneTag,
  updateTag,
  deleteTag,
} from "../controllers/blog/tag.controller";
// import {
//   createImage,
//   findOneImage,
//   deleteImage,
// } from "../controllers/blog/image.controller";

const BlogRoute = (app: Express.Application) => {
  app.use(
    (
      _req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    }
  );

  // Articles
  app.post("/blog/article/", [verifyToken, isAdmin], createArticle);
  app.put("/blog/article/:id", [verifyToken, isAdmin], updateArticle);
  app.delete("/blog/article/:id", [verifyToken, isAdmin], deleteArticle);
  app.get("/blog/article/:id", findOneArticle);
  app.get("/blog/articles/", findAllArticle);
  app.get("/blog/articlesPaginate/", findPaginateArticle);

  // Tags
  app.post("/blog/tag/", [verifyToken, isAdmin], createTag);
  app.put("/blog/tag/:id", [verifyToken, isAdmin], updateTag);
  app.delete("/blog/tag/:id", [verifyToken, isAdmin], deleteTag);
  app.get("/blog/tag/:id", findOneTag);
  app.get("/blog/tags/", findAllTag);

  // Image
  // app.post("/blog/image/", createImage);
  // app.get("/blog/image/:id", findOneImage);
  // app.delete("/blog/image/:id", deleteImage);
};

export default BlogRoute;
