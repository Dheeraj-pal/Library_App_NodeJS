import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roles } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Failed to create user", error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password or Email" });
    }

    const token = jwt.sign(
      { creatorID: user.id, roles: user.roles },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login Successful", token, user });
  } catch (error) {
    console.error("Failed to authenticate user", error);
    res.status(500).json({ message: "Failed to authenticate user" });
  }
};
