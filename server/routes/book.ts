import { Author } from "./../db/models/Author";
import { Book } from "../db/models/Book";
import { Category } from "../db/models/Category";
import { Op } from "../db/db";
import { Review } from "../db/models/Review";
import { Router } from "express";
import { User } from "../db/models/User";

const book = Router();

interface POSTReqBody {
  author: string;
  name: string;
  year: number;
  image: string;
  language: string;
  description: string;
  categories: string[];
  userId: number;
}

book.post("", async (req, res) => {
  const { author, name, year, image, language, description, categories, userId }: POSTReqBody =
    req.body;
  const newBook = { name: name.split(".")[0], year, image, language, description };

  try {
    // busca o crea el author
    const authorOptions = { where: { name: author }, defaults: { name: author } };
    const [authorFind, created] = await Author.findOrCreate(authorOptions);
    // busca el user
    const userFind = await User.findByPk(userId, { rejectOnEmpty: true });
    // busca/crea las categories y toma sus id
    const categoriesId: number[] = [];
    categories.forEach(async (cat) => {
      const catOptions = { where: { name: cat } };
      const [categoryId, created] = await Category.findOrCreate(catOptions);
      categoriesId.push(categoryId.id);
    });

    // crea el book
    const response = await Book.create(newBook);

    // agrega sus relaciones
    await response.$add("Category", categoriesId);
    await userFind.$add("Book", response.id);
    await authorFind.$add("Book", response.id);

    res.status(201).json({ message: "Book created successfully!", response });
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: err });
  }
});

book.get("", async (req, res) => {
  const { name, category, author, language } = req.query;

  let options = {
    where: { [Op.and]: {} },
    include: [{ model: Category }, { model: Author }, { model: Review }],
  };
  try {
    if (name) {
      // busco si existe ese autor
      const authorOptions = { where: { name: { [Op.iLike]: `%${name}%` } }, attributes: ["id"] };
      let authorIds = await Author.findAll(authorOptions);
      // mapeo solo los ids
      authorIds = authorIds.map((val) => val.getDataValue("id"));
      // completo la query para el book
      options.where = {
        [Op.and]: {
          [Op.or]: { name: { [Op.iLike]: `%${name}%` }, authorId: { [Op.or]: authorIds } },
        },
      };
    }
    if (category) {
      options.where[Op.and] = { ...options.where[Op.and], "$categories.name$": category };
    }
    if (author) {
      options.where[Op.and] = { ...options.where[Op.and], "$author.name$": author };
    }
    if (language) {
      options.where[Op.and] = { ...options.where[Op.and], language };
    }

    const response = await Book.findAll(options);
    res.json(response);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

book.get("/top", async (req, res) => {
  try {
    const response = await Book.findAll({ order: [["rating", "DESC"]], limit: 50 });
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

book.get("/:id", async (req, res) => {
  const { id } = req.params;

  const options = { include: [{ model: Category }, { model: Author }, { model: Review }] };

  try {
    const response = await Book.findByPk(id, options);
    res.json(response);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

export default book;
