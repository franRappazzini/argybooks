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
const express_1 = require("express");
const author = (0, express_1.Router)();
author.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Author_1.Author.findAll();
        res.json(response);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
exports.default = author;
