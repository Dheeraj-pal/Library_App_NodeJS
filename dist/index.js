"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const logger_1 = require("./logger");
const user_route_1 = __importDefault(require("./routes/user.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.connectDB)();
app.get("/", (req, res) => {
    res.send("Welcome to Library App");
});
// Logging middleware
app.use(logger_1.loggerMiddleware);
// Routes
app.use("/users", user_route_1.default);
app.use("/books", book_route_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
