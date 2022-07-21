import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";
import { User } from "src/users/entities";

@Table({ tableName: 'followers' })
export class Followers extends BaseModel {


  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isFav: boolean

  @Column({ type: DataType.INTEGER, allowNull: false })
  followedBy: number

  @BelongsTo(() => User, 'followedBy')
  follower: User[]

  @BelongsTo(() => User, 'userId')
  following: User[]
}

// Followers.belongsTo(User, { foreignKey: 'followedBy', as: 'follower' })
// Followers.belongsTo(User, { foreignKey: 'userId', as: 'following' });