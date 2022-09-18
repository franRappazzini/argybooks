import { Author } from "../db/models/Author";
import { Router } from "express";

const author = Router();

author.get("", async (req, res) => {
  try {
    const response = await Author.findAll();
    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default author;
