import { Author } from "./../db/models/Author";
import { Book } from "../db/models/Book";
import { Category } from "../db/models/Category";
import { Op } from "../db/db";
import { Router } from "express";

const book = Router();

interface POSTReqBody {
  author: string;
  name: string;
  year: number;
  image: string;
  language: string;
  description: string;
  categories: string[];
}

book.post("", async (req, res) => {
  const { author, name, year, image, language, description, categories }: POSTReqBody = req.body;
  const newBook = { name: name.split(".")[0], year, image, language, description };

  try {
    // busca o crea el author
    const authorOptions = { where: { name: author }, defaults: { name: author } };
    const [find, created] = await Author.findOrCreate(authorOptions);
    // trae los id de las categories
    const catOptions = { where: { name: { [Op.or]: categories } }, attributes: ["id"] };
    const categoriesId = await Category.findAll(catOptions);
    // crea el book
    const response = await Book.create(newBook);

    // agrega sus relaciones
    response.$add("Category", categoriesId);
    find.$add("Book", response.id);

    res.status(201).json({ message: "Book created successfully!", response });
  } catch (err) {
    res.status(400).json({ response: err });
  }
});

book.get("", async (req, res) => {
  const { name } = req.query;

  try {
    let options = { where: {}, include: [{ model: Category }, { model: Author }] };
    if (name) {
      // busco si existe ese autor
      const authorOptions = { where: { name: { [Op.iLike]: `%${name}%` } }, attributes: ["id"] };
      let authorIds = await Author.findAll(authorOptions);
      // mapeo solo los ids
      authorIds = authorIds.map((val) => val.getDataValue("id"));
      // completo la query para el book
      options.where = {
        [Op.or]: { name: { [Op.iLike]: `%${name}%` }, authorId: { [Op.or]: authorIds } },
      };
    }

    const response = await Book.findAll(options);
    res.json(response);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

book.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Book.findByPk(id, { include: [{ model: Category }, { model: Author }] });
    res.json(response);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

export default book;
