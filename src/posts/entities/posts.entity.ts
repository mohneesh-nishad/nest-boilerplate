import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";
import { User } from "src/users/entities";

@Table({ tableName: 'posts' })
export class Post extends BaseModel {

  @ForeignKey(() => User)
  @Column
  authorId: number

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  published: boolean;

  @BelongsTo(() => User)
  author: User

}