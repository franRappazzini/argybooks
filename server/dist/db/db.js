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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Op = exports.sequelize = void 0;
const dotenv = __importStar(require("dotenv"));
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Op", { enumerable: true, get: function () { return sequelize_1.Op; } });
const sequelize_typescript_1 = require("sequelize-typescript");
dotenv.config();
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const sequelize = process.env.NODE_ENV === "production"
    ? new sequelize_typescript_1.Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        models: [__dirname + "/models"],
        pool: { max: 3, min: 1, idle: 10000 },
        storage: ":memory:",
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false },
            keepAlive: true,
        },
        ssl: true,
        logging: false,
    })
    : new sequelize_typescript_1.Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        username: DB_USER,
        password: DB_PASSWORD,
        storage: ":memory:",
        models: [__dirname + "/models"],
        logging: false,
    });
exports.sequelize = sequelize;
