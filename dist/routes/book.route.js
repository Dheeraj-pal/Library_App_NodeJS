"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middlewares/authenticate");
const authorize_1 = require("../middlewares/authorize");
const books_controller_1 = require("../controllers/books.controller");
const bookRouter = express_1.default.Router();
bookRouter.post("/", authenticate_1.authenticateJWT, (0, authorize_1.authorizeRole)(["CREATOR"]), books_controller_1.createBook);
bookRouter.get("/", authenticate_1.authenticateJWT, (0, authorize_1.authorizeRole)(["VIEWER", "VIEWALL"]), books_controller_1.getBooks);
exports.default = bookRouter;
