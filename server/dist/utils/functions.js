"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const crypto_1 = require("crypto");
const hash = (str) => (0, crypto_1.createHash)("sha256").update(str).digest("hex");
exports.hash = hash;
