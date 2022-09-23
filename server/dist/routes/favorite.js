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
const Author_1 = require("../db/models/Author");
const Book_1 = require("../db/models/Book");
const express_1 = require("express");
const User_1 = require("../db/models/User");
const favorite = (0, express_1.Router)();
favorite.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId } = req.body;
    console.log(req.body);
    try {
        const response = yield User_1.User.findByPk(userId);
        // si no tiene ese favorito, lo agrega sino, lo elimina
        const hasFav = yield (response === null || response === void 0 ? void 0 : response.$has("favorites", bookId));
        if (hasFav)
            yield (response === null || response === void 0 ? void 0 : response.$remove("favorites", bookId));
        else
            yield (response === null || response === void 0 ? void 0 : response.$add("favorites", bookId));
        res.status(200).json({ message: "Request successfully!" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}));
favorite.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const options = { include: { model: Book_1.Book, as: "favorites", include: [Author_1.Author] } };
    try {
        const response = yield User_1.User.findByPk(userId, options);
        res.json(response);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
exports.default = favorite;
