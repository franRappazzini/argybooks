import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "books",
  dialect: "postgres",
  username: "postgres",
  password: "123456",
  storage: ":memory:",
  models: [__dirname + "/models"], // or [Player, Team],
  logging: false,
});

export { sequelize, Op };
