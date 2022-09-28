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
const Review_1 = require("../db/models/Review");
const express_1 = require("express");
const User_1 = require("../db/models/User");
const user = (0, express_1.Router)();
user.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        const response = yield User_1.User.create({ email, password, username });
        res.status(201).json({ message: "User created successfully!", response });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
user.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield User_1.User.findAll({
            include: [{ model: Book_1.Book, as: "favorites" }, { model: Review_1.Review }],
        });
        res.json(response);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
user.get("/logged", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.query;
    try {
        const response = yield User_1.User.findOne({
            where: { email, password },
            include: [{ model: Book_1.Book, as: "favorites" }, { model: Review_1.Review }],
            rejectOnEmpty: true,
        });
        res.json(response);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
user.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield User_1.User.findByPk(id, { rejectOnEmpty: true });
        // vació las relaciones para poder eliminarlo
        yield response.$set("favorites", []);
        yield response.$set("books", []);
        yield response.$set("reviews", []);
        yield response.destroy();
        res.json({ message: "User deleted successfully!" });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
user.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.query;
    try {
        const response = yield User_1.User.findByPk(id, { rejectOnEmpty: true });
        response.password = password;
        yield response.save();
        res.json({ message: "Password updated successfully!", response });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
exports.default = user;
