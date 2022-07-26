import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class IPost extends BaseModel {
  title: string;
  content: string;
  published: boolean;
  author: User;
  authorId: number
}
