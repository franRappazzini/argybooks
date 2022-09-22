"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const author_1 = __importDefault(require("./routes/author"));
const aws_1 = __importDefault(require("./routes/aws"));
const book_1 = __importDefault(require("./routes/book"));
const category_1 = __importDefault(require("./routes/category"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const favorite_1 = __importDefault(require("./routes/favorite"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const review_1 = __importDefault(require("./routes/review"));
const db_1 = require("./db/db");
const user_1 = __importDefault(require("./routes/user"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use((0, express_fileupload_1.default)());
server.use(express_1.default.static("files"));
server.use((0, morgan_1.default)("tiny"));
// TODO rejectOnEmpty revisar
// TODO include
server.use("/book", book_1.default);
server.use("/aws", aws_1.default);
server.use("/category", category_1.default);
server.use("/user", user_1.default);
server.use("/author", author_1.default);
server.use("/review", review_1.default);
server.use("/favorite", favorite_1.default);
const port = 3001;
server.listen(port, () => {
  db_1.sequelize.sync({ force: false });
  console.log("Server listening on port:", port);
});
