import { Field, Float, HideField, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, ForeignKey, Unique } from 'sequelize-typescript';
import { Role } from 'src/common/enums';
import { Followers } from 'src/followers/entities/followers.entity';
import { IFollowers } from 'src/followers/models/followers.model';
import { Post } from 'src/posts/entities';
import { PostConnection } from 'src/posts/models/post-connection.model';
import { IPost } from 'src/posts/models/post.model';



@Table({ modelName: 'users' })
@ObjectType('User')
export class User extends Model<User> {

  @Field()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  name: string;

  @Field(() => String)
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  dob: Date;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  phoneNumber: string;

  @Field({ nullable: true })
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 1 })
  userType: number;

  @Field({ nullable: true })
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 1 })
  userInfo: number; // 1 for xana or 2 for xanalia 3 for tcg

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  walletAddress: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  nonce: string;

  @Field({ nullable: true })
  @Unique('email')
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null, unique: 'email' })
  email: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  avatar: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  tcgAvatar: string;

  @HideField()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  password: string;

  @Field(() => Role)
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER', validate: { isIn: [['ADMIN', 'USER', 'GUEST']] } })
  role: Role;

  @Field(() => Float)
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true, defaultValue: 0.00 })
  coins: number;

  @Field(() => Boolean)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerified: boolean;

  @Field(() => Boolean)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isRegister: boolean;

  @Field(() => Boolean)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean

  @Field(() => PostConnection, { nullable: true })
  @HasMany(() => Post)
  posts?: Post[]

  @Field()
  @CreatedAt
  createdAt: Date;

  // @Column({ type: DataType.DATE, allowNull: true, defaultValue: Date.now() })
  @Field()
  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Followers, { onDelete: 'cascade', hooks: true })
  @Field(() => [Followers], { nullable: true })
  // followers: User[]
  followers?: User[]

  @HasMany(() => Followers, { onDelete: 'cascade', hooks: true })
  @Field(() => [Followers], { nullable: true })
  followings?: User[]
}

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

