import * as dotenv from "dotenv";

import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

dotenv.config();
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

// const sequelize = new Sequelize({
//   database: "books",
//   dialect: "postgres",
//   username: "postgres",
//   password: "123456",
//   storage: ":memory:",
//   models: [__dirname + "/models"], // or [Player, Team],
//   logging: false,
// });

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
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
    : new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        username: DB_USER,
        password: DB_PASSWORD,
        storage: ":memory:",
        models: [__dirname + "/models"], // or [Player, Team],
        logging: false,
      });

export { sequelize, Op };
