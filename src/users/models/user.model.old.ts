import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
  Int,
} from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { User } from './user.model';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

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