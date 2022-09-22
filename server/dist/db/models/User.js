"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Book_1 = require("./Book");
const Review_1 = require("./Review");
const Users_Books_1 = require("./Users_Books");
const functions_1 = require("../../utils/functions");
let User = class User extends sequelize_typescript_1.Model {
    set password(value) {
        this.setDataValue("password", (0, functions_1.hash)(value));
    }
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], User.prototype, "password", null);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Review_1.Review),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Book_1.Book),
    __metadata("design:type", Array)
], User.prototype, "books", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Book_1.Book, () => Users_Books_1.Users_Books),
    __metadata("design:type", Array)
], User.prototype, "favorites", void 0);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
