import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { Book } from "./Book";
import { Category } from "./Category";

// tabla relacional book - category
@Table
export class Books_Categories extends Model {
  @ForeignKey(() => Book)
  @Column
  declare bookId: number;

  @ForeignKey(() => Category)
  @Column
  declare categoryId: number;
}
