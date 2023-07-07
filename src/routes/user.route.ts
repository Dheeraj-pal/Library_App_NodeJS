import express from "express";
import { signup, login } from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);

export default userRoute;
