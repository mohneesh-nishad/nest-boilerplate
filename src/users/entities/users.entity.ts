import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, ForeignKey } from 'sequelize-typescript';
import { Followers } from 'src/followers/entities/followers.entity';
import { IFollowers } from 'src/followers/models/followers.model';
import { Post } from 'src/posts/entities';
import { IPost } from 'src/posts/models/post.model';

@Table({ modelName: 'users' })
@ObjectType()
export class User extends Model<User> {

  @Field()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Field()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  name: string;

  @Field()
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  dob: Date;

  @Field()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  phoneNumber: string;

  @Field()
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 1 })
  userType: number;

  @Field()
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 1 })
  userInfo: number; // 1 for xana or 2 for xanalia 3 for tcg

  @Field()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  walletAddress: string;

  @Field()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  nonce: string;

  @Field()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  email: string;

  @Field()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  avatar: string;

  @Field()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  tcgAvatar: string;

  @HideField()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  password: string;

  @Field()
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER', validate: { isIn: [['ADMIN', 'USER', 'GUEST']] } })
  role: string;

  @Field()
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true, defaultValue: 0.00 })
  coins: number;

  @Field()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerified: boolean;

  @Field()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isRegister: boolean;

  @Field()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean

  @Field(() => [Post], { nullable: true })
  @HasMany(() => Post)
  posts?: Post[]

  @Field()
  @CreatedAt
  createdAt: Date;

  // @Column({ type: DataType.DATE, allowNull: true, defaultValue: Date.now() })
  @Field()
  @UpdatedAt
  updatedAt: Date;

  // // @HasMany(() => Followers, { as: 'followers', onDelete: 'cascade', hooks: true })
  @Field(() => [Followers], { nullable: true })
  followers: Followers
  // followers?: User[]

  @HasMany(() => Followers, { onDelete: 'cascade', hooks: true })
  @Field(() => [Followers], { nullable: true })
  followings?: User[]
}

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

