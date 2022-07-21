import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { PostIdArgs } from './args/post-id.args';
import { UserIdArgs } from './args/user-id.args';
import { IPost } from './models/post.model';
import { PostConnection } from './models/post-connection.model';
import { PostOrder } from './dto/post-order.input';
import { CreatePostInput } from './dto/createPost.input';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { PostBulkRes } from './interfaces/bulk-post.interface';

const pubSub = new PubSub();

@Resolver(() => IPost)
export class PostsResolver {
  constructor(private postService: PostsService, private userService: UsersService) { }

  @Subscription(() => IPost)
  postCreated() {
    return pubSub.asyncIterator('postCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => IPost, { name: 'createPost' })
  async createPost(
    @UserEntity() user: User,
    @Args('data') data: CreatePostInput
  ) {
    const newPost = await this.postService.createPost({
      title: data.title,
      content: data.content,
      authorId: user.id
    })
    // console.log(newPost.toJSON())

    pubSub.publish('postCreated', { postCreated: newPost });
    return newPost
  }

  // @Query(() => PostConnection)
  // async publishedPosts(
  //   @Args() { after, before, first, last }: PaginationArgs,
  //   @Args({ name: 'query', type: () => String, nullable: true })
  //   query: string,
  //   @Args({
  //     name: 'orderBy',
  //     type: () => PostOrder,
  //     nullable: true,
  //   })
  //   orderBy: PostOrder
  // ) {
  //   const a = await findManyCursorConnection(
  //     (args) =>
  //       this.prisma.post.findMany({
  //         include: { author: true },
  //         where: {
  //           published: true,
  //           title: { contains: query || '' },
  //         },
  //         orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
  //         ...args,
  //       }),
  //     () =>
  //       this.prisma.post.count({
  //         where: {
  //           published: true,
  //           title: { contains: query || '' },
  //         },
  //       }),
  //     { first, last, before, after }
  //   );
  //   return a;
  // }

  @Query(() => PostBulkRes)
  async userPosts(@Args() id: UserIdArgs): Promise<PostBulkRes> {
    const { data, count } = await this.postService.getUserPosts(id.userId)
    // console.log(data);
    const msg = count ? `Posts fetched of user id = ${id.userId}` : `No posts from user.`
    return { payload: data, count, msg }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => IPost)
  async getPost(@Args() args: PostIdArgs, @UserEntity() user: User) {
    return this.postService.getSinglePostOfUser(args.postId, user.id)
  }

  @ResolveField('author')
  async author(@Parent() post: IPost) {
    if (!post.author)
      return this.userService.findOneById(post.authorId);
    return post.author
  }
}
