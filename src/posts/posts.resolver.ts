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
import { User } from 'src/users/entities';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { PostIdArgs } from './args/post-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Post } from './entities';
import { PostConnection } from './models/post-connection.model';
import { PostOrder } from './dto/post-order.input';
import { CreatePostInput } from './dto/create-post.input';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { PostBulkRes } from './interfaces/bulk-post.interface';
import { GetAllPostInput } from './dto/get-all-post.dto';

const pubSub = new PubSub();

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postService: PostsService, private userService: UsersService) { }

  @Subscription(() => Post)
  postCreated() {
    return pubSub.asyncIterator('postCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { name: 'createPost', description: 'API to create a post.\n Auth Required ' })
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

  @Query(() => PostConnection)
  async userPosts(@Args() args: UserIdArgs): Promise<PostConnection> {
    const { page, limit, userId, orderBy } = args
    const { data, count } = await this.postService.getUserPosts(page, limit, userId)
    // console.log(data);
    const msg = count ? `Posts fetched of user id = ${args}.userId}` : `No posts from user.`
    return { payload: data, count, msg }
  }

  @Query(() => PostConnection)
  async getAllPosts(@Args('getAllPostInput') args: GetAllPostInput) {
    const { page, limit, orderBy } = args
    const { data, count } = await this.postService.getAllPosts(page, limit, orderBy);
    return { payload: data, count, page: args.page, limit: args.limit, msg: 'All posts fetched.' }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Post)
  async getPost(@Args() args: PostIdArgs, @UserEntity() user: User) {
    return this.postService.getSinglePostOfUser(args.postId, user.id)
  }

  @ResolveField('author')
  async author(@Parent() post: Post) {
    if (!post.author)
      return this.userService.findOneById(post.authorId);
    return post.author
  }
}
