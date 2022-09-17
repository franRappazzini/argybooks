import { Category } from "../db/models/Category";
import { Router } from "express";

const category = Router();

category.post("", async (req, res) => {
  const { name } = req.body;

  try {
    const response = await Category.create({ name });
    res.json({ message: "Category created successfully!", response });
  } catch (err) {}
});

category.get("", async (req, res) => {
  try {
    const response = await Category.findAll();
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

export default category;
