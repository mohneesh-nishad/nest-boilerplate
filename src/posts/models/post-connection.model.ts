import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { IPost } from './post.model';

@ObjectType()
export class PostConnection extends PaginatedResponse(IPost) {}
