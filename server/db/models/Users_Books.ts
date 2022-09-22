import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Book } from "./Book";
import { User } from "./User";

// tabla relacional para favoritos
@Table
export class Users_Books extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @ForeignKey(() => Book)
  @Column
  declare bookId: number;
}
