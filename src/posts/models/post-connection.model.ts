import { ObjectType } from '@nestjs/graphql';
import Paginator from 'src/common/pagination/nwpagination';
import Paginated from 'src/common/pagination/pagination';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Post } from '../entities';
import { IPost } from './post.model';

@ObjectType()
export class PostConnection extends Paginator(Post) { }


@ObjectType()
export class PostCursorConnection extends Paginated(Post) { }