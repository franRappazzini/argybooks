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
exports.Book = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Author_1 = require("./Author");
const Books_Categories_1 = require("./Books_Categories");
const Category_1 = require("./Category");
const Review_1 = require("./Review");
const User_1 = require("./User");
const Users_Books_1 = require("./Users_Books");
let Book = class Book extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Book.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Book.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Book.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Book.prototype, "language", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(2000)),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Book.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Author_1.Author),
    __metadata("design:type", Author_1.Author)
], Book.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Author_1.Author),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Book.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Book.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Book.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Review_1.Review),
    __metadata("design:type", Array)
], Book.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Category_1.Category, () => Books_Categories_1.Books_Categories),
    __metadata("design:type", Array)
], Book.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.User, () => Users_Books_1.Users_Books),
    __metadata("design:type", Array)
], Book.prototype, "favorites", void 0);
Book = __decorate([
    sequelize_typescript_1.Table
], Book);
exports.Book = Book;
