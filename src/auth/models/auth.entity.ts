import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities';
import { Token } from './token.entity';

@ObjectType()
export class Auth extends Token {
  user: User;
}
