import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { loggerMiddleware } from "./logger";
import userRoute from "./routes/user.route";
import bookRouter from "./routes/book.route";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library App");
});

// Logging middleware
app.use(loggerMiddleware);

// Routes
app.use("/users", userRoute);
app.use("/books", bookRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
