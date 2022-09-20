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
import { Favorite } from "./Favorite";
import { Review } from "./Review";
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

  @HasMany(() => Favorite)
  declare favorites: Favorite[];

  //   declare password: string;

  // @BelongsToMany(() => Category, () => Books_Categories)
  // declare categories: Category[];

  // @ForeignKey(() => Author)
  // @Column
  // declare authorId: number;

  // @BelongsTo(() => Author)
  // declare author: Author;
}
