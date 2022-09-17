import { AllowNull, BelongsToMany, Column, Model, Table, Unique } from "sequelize-typescript";

import { Book } from "./Book";
import { Books_Categories } from "./Books_Categories";

@Table
export class Category extends Model {
  @Unique
  @AllowNull(false)
  @Column
  declare name: string;

  @BelongsToMany(() => Book, () => Books_Categories)
  declare books: Book[];
}
