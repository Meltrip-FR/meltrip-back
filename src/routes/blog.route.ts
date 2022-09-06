import Express from "express";
import { isModeratorOrAdmin, verifyToken } from "./middleware/authJwt";
import {
  createArticle,
  findAllArticle,
  findOneArticle,
  updateArticle,
  deleteArticle,
  findPaginateArticle,
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

export const BlogRoute = (app: Express.Application) => {
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
  app.post("/blog/article/", [verifyToken, isModeratorOrAdmin], createArticle);
  app.get("/blog/articles/", findAllArticle);
  app.get("/blog/articlesPaginate/", findPaginateArticle);
  app.get("/blog/article/:id", findOneArticle);
  app.put(
    "/blog/article/:id",
    [verifyToken, isModeratorOrAdmin],
    updateArticle
  );
  app.delete(
    "/blog/article/:id",
    [verifyToken, isModeratorOrAdmin],
    deleteArticle
  );

  // Tags
  app.post("/blog/tag/", [verifyToken, isModeratorOrAdmin], createTag);
  app.get("/blog/tags/", findAllTag);
  app.get("/blog/tag/:id", findOneTag);
  app.put("/blog/tag/:id", [verifyToken, isModeratorOrAdmin], updateTag);
  app.delete("/blog/tag/:id", [verifyToken, isModeratorOrAdmin], deleteTag);

  // Image
  // app.post("/blog/image/", createImage);
  // app.get("/blog/image/:id", findOneImage);
  // app.delete("/blog/image/:id", deleteImage);
};
