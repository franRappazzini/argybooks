import { Author } from "../db/models/Author";
import { Book } from "../db/models/Book";
import { Router } from "express";
import { User } from "../db/models/User";

const favorite = Router();

favorite.post("", async (req, res) => {
  const { userId, bookId } = req.body;
  console.log(req.body);

  try {
    const response = await User.findByPk(userId);

    // si no tiene ese favorito, lo agrega sino, lo elimina
    const hasFav = await response?.$has("favorites", bookId);
    if (hasFav) await response?.$remove("favorites", bookId);
    else await response?.$add("favorites", bookId);

    // const [response, created] = await Favorite.findOrCreate({ where: { userId, bookId } });

    // if (!created) await response.destroy();

    res.status(200).json({ message: "Request successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

favorite.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const options = { include: { model: Book, as: "favorites", include: [Author] } };
  try {
    const response = await User.findByPk(userId, options);

    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default favorite;
