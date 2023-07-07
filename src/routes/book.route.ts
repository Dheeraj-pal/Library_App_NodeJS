import express from "express";
import { authenticateJWT } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorize";
import { createBook, getBooks } from "../controllers/books.controller";

const bookRouter = express.Router();

bookRouter.post("/", authenticateJWT, authorizeRole(["CREATOR"]), createBook);
bookRouter.get(
  "/",
  authenticateJWT,
  authorizeRole(["VIEWER", "VIEWALL"]),
  getBooks
);

export default bookRouter;
