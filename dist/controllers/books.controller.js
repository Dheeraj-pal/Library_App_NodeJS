"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, creatorID } = req.body;
        const book = new book_model_1.Book({
            title,
            author,
            creatorID,
            createdAt: new Date(),
        });
        yield book.save();
        res.status(201).json({ message: "Book created successfully" });
    }
    catch (error) {
        console.error("Failed to create book", error);
        res.status(500).json({ message: "Failed to create book" });
    }
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        const { old, New } = req.query;
        let books;
        if (old === "1") {
            if (user.roles.includes("VIEWER") || user.roles.includes("CREATOR")) {
                books = yield book_model_1.Book.find({
                    creatorID: user.creatorID,
                    createdAt: { $lte: new Date(Date.now() - 10 * 60 * 1000) },
                });
            }
            else if (user.roles.includes("VIEWALL")) {
                books = yield book_model_1.Book.find({
                    createdAt: { $lte: new Date(Date.now() - 10 * 60 * 1000) },
                });
            }
        }
        else if (New === "1") {
            if (user.roles.includes("VIEWER") || user.roles.includes("CREATOR")) {
                books = yield book_model_1.Book.find({
                    creatorID: user.creatorID,
                    createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
                });
            }
            else if (user.roles.includes("VIEWALL")) {
                books = yield book_model_1.Book.find({
                    createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
                });
            }
        }
        else {
            if (user.roles.includes("VIEWER") || user.roles.includes("CREATOR")) {
                // Only show books created by the viewer or creator
                books = yield book_model_1.Book.find({
                    creatorID: user.creatorID,
                });
            }
            else if (user.roles.includes("VIEWALL")) {
                // Show all books
                books = yield book_model_1.Book.find({});
            }
        }
        res.json(books);
    }
    catch (error) {
        console.error("Failed to get books", error);
        res.status(500).json({ message: "Failed to get books" });
    }
});
exports.getBooks = getBooks;
