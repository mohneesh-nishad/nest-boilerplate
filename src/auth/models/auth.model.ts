import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
