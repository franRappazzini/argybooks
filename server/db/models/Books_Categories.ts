import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { Book } from "./Book";
import { Category } from "./Category";

// Relational table Books_Categories
@Table
export class Books_Categories extends Model {
  @ForeignKey(() => Book)
  @Column
  declare bookId: number;

  @ForeignKey(() => Category)
  @Column
  declare categoryId: number;
}
