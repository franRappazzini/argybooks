import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { Book } from "./Book";
import { User } from "./User";

@Table
export class Favorite extends Model {
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
