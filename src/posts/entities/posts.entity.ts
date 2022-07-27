import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";
import { User } from "src/users/entities";
// import { withRelayPagination } from '@thomas-smyth/sequelize-cursor-pagination'
import { makePaginate } from "sequelize-cursor-pagination";

@Table({ tableName: 'posts' })
@ObjectType('Post')
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

/** //* added below line for cursor based pagination. Had to bind function explicitely for model
// TODO  ==>> find a workaround with generic functions.
* reference : https://github.com/Kaltsoon/sequelize-cursor-pagination
*/
Post.paginate = makePaginate(Post, { primaryKeyField: 'id' })


// * reference = https://npm.io/package/@thomas-smyth/sequelize-cursor-pagination
// withRelayPagination()(Post)