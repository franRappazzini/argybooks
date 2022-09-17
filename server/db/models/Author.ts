import { AllowNull, BelongsTo, Column, HasMany, Model, Table, Unique } from "sequelize-typescript";

import { Book } from "./Book";

@Table
export class Author extends Model {
  @Unique
  @AllowNull(false)
  @Column
  declare name: string;

  @HasMany(() => Book)
  declare books: Book[];
}
