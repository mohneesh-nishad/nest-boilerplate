import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";
import { User } from "src/users/entities";


@Table({ modelName: 'followers' })
@ObjectType('Follower')
export class Followers extends BaseModel {

  @Field()
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId?: number

  @Field()
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isFav?: boolean

  @Field()
  @Column({ type: DataType.INTEGER, allowNull: false })
  followedBy?: number

  // @Field(() => [User])

  @BelongsTo(() => User, { foreignKey: 'followedBy', as: 'follower' })
  followers?: User[]

  // @Field(() => [User])
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'following' })
  followings?: User[]
}
