import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";
import { User } from "src/users/entities";

@Table({ tableName: 'posts' })
@ObjectType()
export class Post extends BaseModel {

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column
  authorId: number

  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Field(() => Boolean)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  published: boolean;

  @Field(() => User)
  @BelongsTo(() => User)
  author: User

}