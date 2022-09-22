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
const Book_1 = require("../db/models/Book");
const db_1 = require("../db/db");
const Review_1 = require("../db/models/Review");
const express_1 = require("express");
const User_1 = require("../db/models/User");
const review = (0, express_1.Router)();
review.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId, rating } = req.body;
    console.log(req.body);
    try {
        // busco para agregar relaciones
        const userFind = yield User_1.User.findByPk(userId, { rejectOnEmpty: true });
        const bookFind = yield Book_1.Book.findByPk(bookId, { include: Review_1.Review, rejectOnEmpty: true });
        const [response, created] = yield Review_1.Review.findOrCreate({
            where: { [db_1.Op.and]: [{ bookId }, { userId }] },
            defaults: { rating, bookId, userId },
        });
        console.log(response);
        if (rating === 0)
            yield response.destroy();
        else if (created) {
            // agrego relaciones
            yield userFind.$add("Review", bookId);
            yield bookFind.$add("Review", userId);
        }
        else {
            // actualizo el rating del review y user
            response.rating = rating;
            // const userReview = userFind.reviews.find((r) => r.bookId === bookId);
            // if (userReview) userReview.rating = rating;
            yield response.save();
            // await userFind.save();
        }
        // vuelvo a buscarlo para actualizar el rating
        const bookUpdate = yield Book_1.Book.findByPk(bookId, { include: Review_1.Review, rejectOnEmpty: true });
        // le actualizo el rating al book
        let tot = 0;
        bookUpdate.reviews.forEach((r) => (tot += r.rating));
        const average = tot / bookUpdate.reviews.length || 0; // porque en el primer caso las reviews están vacías
        bookUpdate.rating = average;
        yield bookUpdate.save();
        res.status(201).json({ message: "Review created successfully!", response });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
exports.default = review;
