import { Book } from "../db/models/Book";
import { Favorite } from "../db/models/Favorite";
import { Router } from "express";
import { User } from "../db/models/User";

const favorite = Router();

favorite.post("", async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    // const findUser = await User.findByPk(userId, { rejectOnEmpty: true });
    // const findBook = await Book.findByPk(bookId, { rejectOnEmpty: true });
    const [response, created] = await Favorite.findOrCreate({ where: { userId, bookId } });

    if (!created) await response.destroy();
    // findUser.$add("Favorite", bookId);

    res.status(200).json({ message: "Added to favorites successfully!", response });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default favorite;
