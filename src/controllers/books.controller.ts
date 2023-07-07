import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;

    const book = new Book({
      title,
      author,
      createdAt: new Date(),
    });

    await book.save();

    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    console.error("Failed to create book", error);
    res.status(500).json({ message: "Failed to create book" });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { old, New } = req.query;

    let books;

    if (old === "1") {
      books = await Book.find({
        createdAt: { $lte: new Date(Date.now() - 10 * 60 * 1000) },
      });
    } else if (New === "1") {
      books = await Book.find({
        createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
      });
    } else {
      // books = await Book.find();
      if (user.roles.includes("VIEWER") || user.roles.includes("CREATOR")) {
        // Only show books created by the viewer
        books = await Book.find({
          authorEmail: user.email,
        });
      } else if (user.roles.includes("VIEWALL")) {
        // Show all books
        books = await Book.find({});
      }
    }

    res.json(books);
  } catch (error) {
    console.error("Failed to get books", error);
    res.status(500).json({ message: "Failed to get books" });
  }
};
