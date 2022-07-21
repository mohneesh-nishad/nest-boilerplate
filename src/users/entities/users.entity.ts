import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, ForeignKey } from 'sequelize-typescript';
import { Followers } from 'src/followers/entities/followers.entity';
import { Post } from 'src/posts/entities';

@Table({ modelName: 'users' })
export class User extends Model<User> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  name: string;


  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  dob: Date;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  phoneNumber: string;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 1 })
  userType: number;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 1 })
  userInfo: number; // 1 for xana or 2 for xanalia 3 for tcg

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  walletAddress: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  nonce: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  avatar: string;


  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  tcgAvatar: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER', validate: { isIn: [['ADMIN', 'USER', 'GUEST']] } })
  role: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true, defaultValue: 0.00 })
  coins: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerified: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isRegister: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean
  @HasMany(() => Post)
  posts?: Post[]

  // @Column()
  @CreatedAt
  createdAt: Date;

  // @Column({ type: DataType.DATE, allowNull: true, defaultValue: Date.now() })
  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Followers, { onDelete: 'cascade', hooks: true })
  followers: User[]
}

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

