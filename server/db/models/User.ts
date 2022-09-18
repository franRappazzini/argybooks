import { AllowNull, Column, DataType, IsEmail, Model, Table, Unique } from "sequelize-typescript";

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
  //   declare password: string;

  // @BelongsToMany(() => Category, () => Books_Categories)
  // declare categories: Category[];

  // @ForeignKey(() => Author)
  // @Column
  // declare authorId: number;

  // @BelongsTo(() => Author)
  // declare author: Author;
}
