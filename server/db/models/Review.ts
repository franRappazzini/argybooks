import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { Book } from "./Book";
import { User } from "./User";

@Table
export class Review extends Model {
  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare rating: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsTo(() => Book)
  declare book: Book;

  @ForeignKey(() => Book)
  @Column
  declare bookId: number;

  //   declare password: string;

  // @BelongsToMany(() => Category, () => Books_Categories)
  // declare categories: Category[];

  // @ForeignKey(() => Author)
  // @Column
  // declare authorId: number;
}
