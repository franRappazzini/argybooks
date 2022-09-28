"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const express_1 = require("express");
dotenv.config();
const { AWS_KEY, AWS_SECRET_KEY, BUCKET_NAME } = process.env;
const config = {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
};
aws_sdk_1.default.config.update(config);
const s3 = new aws_sdk_1.default.S3();
const aws = (0, express_1.Router)();
aws.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    try {
        const putObject = {
            Bucket: BUCKET_NAME || "",
            Key: file.name,
            Body: file.data,
        };
        s3.putObject(putObject, (err, data) => {
            if (err)
                throw err;
        });
        res.status(201).json({ message: "Book uploaded successfully!" });
    }
    catch (err) {
        res.status(400).json({ response: err });
    }
}));
aws.get("/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const bucketAndKey = {
            Bucket: BUCKET_NAME || "",
            Key: `${name}.pdf`,
        };
        s3.getObject(bucketAndKey, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            res.json({ data: yield data.Body });
        }));
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
exports.default = aws;
