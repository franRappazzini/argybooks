import aws from "./routes/aws";
import book from "./routes/book";
import category from "./routes/category";
import cors from "cors";
import express from "express";
import fileupload from "express-fileupload";
import morgan from "morgan";
import { sequelize } from "./db/db";

const server = express();
server.use(cors());
server.use(express.json());
server.use(fileupload());
server.use(express.static("files"));
server.use(morgan("tiny"));

// TODO rejectOnEmpty revisar
// TODO include
server.use("/book", book);
server.use("/aws", aws);
server.use("/category", category);

const port = 3001;
server.listen(port, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port:", port);
});
