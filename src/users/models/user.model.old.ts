import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
  Int,
} from '@nestjs/graphql';
import Paginator from 'src/common/pagination/nwpagination';
import { User } from '../entities';
// import { User } from './user.model';


// @ObjectType()
// export class User extends BaseModel {
//   email: string;
//   firstname?: string;
//   lastname?: string;
//   @Field(() => Role)
//   role: Role;
//   posts: Post[];
//   @HideField()
//   password: string;
// }

@ObjectType()
export class UserResponse {
  @Field(() => [User])
  payload: User[];

  @Field(() => Int)
  count: number;

  @Field(() => String)
  msg: string
}

@ObjectType()
export class UserConnection extends Paginator(User) { }