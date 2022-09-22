import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  IsEmail,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";

import { Book } from "./Book";
import { Review } from "./Review";
import { Users_Books } from "./Users_Books";
import { hash } from "../../utils/functions";

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  declare username: string;

  @Unique
  @AllowNull(false)
  @IsEmail
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  set password(value: string) {
    this.setDataValue("password", hash(value));
  }

  @HasMany(() => Review)
  declare reviews: Review[];

  @HasMany(() => Book)
  declare books: Book[];

  @BelongsToMany(() => Book, () => Users_Books)
  declare favorites: Users_Books[];

  //   declare password: string;

  // @BelongsToMany(() => Category, () => Books_Categories)
  // declare categories: Category[];

  // @ForeignKey(() => Author)
  // @Column
  // declare authorId: number;

  // @BelongsTo(() => Author)
  // declare author: Author;
}
