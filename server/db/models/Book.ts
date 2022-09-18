import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";

import { Author } from "./Author";
import { Books_Categories } from "./Books_Categories";
import { Category } from "./Category";

@Table
export class Book extends Model {
  @Unique
  @AllowNull(false)
  @Column
  declare name: string;
  @AllowNull(false)
  @Column
  declare year: number;
  @AllowNull(false)
  @Column
  declare image: string;
  @AllowNull(false)
  @Column
  declare language: string;
  @AllowNull(false)
  @Column
  declare description: string;
  @Default(0)
  @Column
  declare rating: number;

  @BelongsToMany(() => Category, () => Books_Categories)
  declare categories: Category[];

  @ForeignKey(() => Author)
  @Column
  declare authorId: number;

  @BelongsTo(() => Author)
  declare author: Author;
}
