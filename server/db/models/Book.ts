import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";

import { Author } from "./Author";
import { Books_Categories } from "./Books_Categories";
import { Category } from "./Category";
import { Review } from "./Review";
import { User } from "./User";

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
  @Column(DataType.FLOAT)
  declare rating: number;

  @BelongsTo(() => Author)
  declare author: Author;

  @ForeignKey(() => Author)
  @Column
  declare authorId: number;

  @BelongsTo(() => User)
  declare createdBy: User;

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @HasMany(() => Review)
  declare reviews: Review[];

  @BelongsToMany(() => Category, () => Books_Categories)
  declare categories: Category[];
}
