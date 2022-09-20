import { Review } from "../db/models/Review";
import { Router } from "express";
import { User } from "../db/models/User";
import { hash } from "./../utils/functions";

const user = Router();

user.post("", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const response = await User.create({ email, password, username });
    res.status(201).json({ message: "User created successfully!", response });
  } catch (err) {
    res.status(400).json(err);
  }
});

user.get("", async (req, res) => {
  try {
    const response = await User.findAll({ include: Review });
    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

user.get("/logged", async (req, res) => {
  const { email, password }: any = req.query;

  try {
    const response = await User.findOne({
      where: { email, password: hash(password) },
      rejectOnEmpty: true,
    });
    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default user;
