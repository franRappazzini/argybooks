import * as dotenv from "dotenv";

import author from "./routes/author";
import book from "./routes/book";
import category from "./routes/category";
import cors from "cors";
import express from "express";
import favorite from "./routes/favorite";
import fileupload from "express-fileupload";
import morgan from "morgan";
import review from "./routes/review";
import { sequelize } from "./db/db";
import user from "./routes/user";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(fileupload());
server.use(express.static("files"));
server.use(morgan("tiny"));

server.use("/book", book);
server.use("/category", category);
server.use("/user", user);
server.use("/author", author);
server.use("/review", review);
server.use("/favorite", favorite);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port:", port);
});
