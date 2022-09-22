import { Book } from "../db/models/Book";
import { Op } from "../db/db";
import { Review } from "../db/models/Review";
import { Router } from "express";
import { User } from "../db/models/User";

const review = Router();

review.post("", async (req, res) => {
  const { userId, bookId, rating } = req.body;
  console.log(req.body);

  try {
    // busco para agregar relaciones
    const userFind = await User.findByPk(userId, { rejectOnEmpty: true });
    const bookFind = await Book.findByPk(bookId, { include: Review, rejectOnEmpty: true });
    const [response, created] = await Review.findOrCreate({
      where: { [Op.and]: [{ bookId }, { userId }] },
      defaults: { rating, bookId, userId },
    });

    console.log(response);

    if (rating === 0) await response.destroy();
    else if (created) {
      // agrego relaciones
      await userFind.$add("Review", bookId);
      await bookFind.$add("Review", userId);
    } else {
      // actualizo el rating del review y user
      response.rating = rating;
      // const userReview = userFind.reviews.find((r) => r.bookId === bookId);
      // if (userReview) userReview.rating = rating;
      await response.save();
      // await userFind.save();
    }

    // vuelvo a buscarlo para actualizar el rating
    const bookUpdate = await Book.findByPk(bookId, { include: Review, rejectOnEmpty: true });
    // le actualizo el rating al book
    let tot = 0;
    bookUpdate.reviews.forEach((r) => (tot += r.rating));
    const average = tot / bookUpdate.reviews.length || 0; // porque en el primer caso las reviews están vacías
    bookUpdate.rating = average;
    await bookUpdate.save();

    res.status(201).json({ message: "Review created successfully!", response });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default review;
