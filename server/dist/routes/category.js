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
const Category_1 = require("../db/models/Category");
const express_1 = require("express");
const category = (0, express_1.Router)();
category.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const response = yield Category_1.Category.create({ name });
        res.json({ message: "Category created successfully!", response });
    }
    catch (err) { }
}));
category.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Category_1.Category.findAll();
        res.json(response);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
}));
exports.default = category;
