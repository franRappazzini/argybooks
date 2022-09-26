"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Author_1 = require("./../db/models/Author");
const Book_1 = require("../db/models/Book");
const Category_1 = require("../db/models/Category");
const db_1 = require("../db/db");
const Review_1 = require("../db/models/Review");
const express_1 = require("express");
const User_1 = require("../db/models/User");
const book = (0, express_1.Router)();
book.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, name, year, image, language, description, categories, userId } = req.body;
    const newBook = { name: name.split(".")[0], year, image, language, description };
    try {
        // busca o crea el author
        const authorOptions = { where: { name: author }, defaults: { name: author } };
        const [authorFind, created] = yield Author_1.Author.findOrCreate(authorOptions);
        // busca el user
        const userFind = yield User_1.User.findByPk(userId, { rejectOnEmpty: true });
        // busca/crea las categories y toma sus id
        const categoriesId = [];
        categories.forEach((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const catOptions = { where: { name: cat } };
            const [categoryId, created] = yield Category_1.Category.findOrCreate(catOptions);
            categoriesId.push(categoryId.id);
        }));
        // crea el book
        const response = yield Book_1.Book.create(newBook);
        // agrega sus relaciones
        yield response.$add("Category", categoriesId);
        yield userFind.$add("Book", response.id);
        yield authorFind.$add("Book", response.id);
        res.status(201).json({ message: "Book created successfully!" }); //, response });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ response: err });
    }
}));
book.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, author, language } = req.query;
    let options = {
        where: { [db_1.Op.and]: {} },
        include: [{ model: Category_1.Category }, { model: Author_1.Author }, { model: Review_1.Review }],
    };
    try {
        if (name) {
            // busco si existe ese autor
            const authorOptions = { where: { name: { [db_1.Op.iLike]: `%${name}%` } }, attributes: ["id"] };
            let authorIds = yield Author_1.Author.findAll(authorOptions);
            // mapeo solo los ids
            authorIds = authorIds.map((val) => val.getDataValue("id"));
            // completo la query para el book
            options.where = {
                [db_1.Op.and]: {
                    [db_1.Op.or]: { name: { [db_1.Op.iLike]: `%${name}%` }, authorId: { [db_1.Op.or]: authorIds } },
                },
            };
        }
        if (category) {
            options.where[db_1.Op.and] = Object.assign(Object.assign({}, options.where[db_1.Op.and]), { "$categories.name$": category });
        }
        if (author) {
            options.where[db_1.Op.and] = Object.assign(Object.assign({}, options.where[db_1.Op.and]), { "$author.name$": author });
        }
        if (language) {
            options.where[db_1.Op.and] = Object.assign(Object.assign({}, options.where[db_1.Op.and]), { language });
        }
        const response = yield Book_1.Book.findAll(options);
        res.json(response);
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
}));
book.get("/top", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Book_1.Book.findAll({ order: [["rating", "DESC"]], limit: 50 });
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}));
book.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const options = { include: [{ model: Category_1.Category }, { model: Author_1.Author }, { model: Review_1.Review }] };
    try {
        const response = yield Book_1.Book.findByPk(id, options);
        res.json(response);
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
}));
exports.default = book;
