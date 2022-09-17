import { Router } from "express";
import { User } from "../db/models/User";

const user = Router();

user.post("", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await User.create({ email, password });
    res.status(201).json({ message: "User created successfully!", response });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default user;
