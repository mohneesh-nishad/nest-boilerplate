import { BadRequestException, ConflictException, HttpException, InternalServerErrorException, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { Followers } from './entities';
import { FollowersService } from './followers.service';
import { IFollowers } from './models/followers.model';
import { FollowUserArgs } from './args/follow-user.args';
import { UserInputError } from 'apollo-server-express';
import errHandler, { GlobalErrorHandler } from 'src/common/globalErrorHandler';
import { FollowConnection } from './models/follow-connection.model';
import { UserIdArgs } from 'src/posts/args/user-id.args';
import { FollowPagination } from './args/followers-pagination.args';
@UseGuards(GqlAuthGuard)
@Resolver('FollowersAPI')
export class FollowersResolver {
  constructor(private service: FollowersService) { }

  // @Query(() => FollowConnection)
  // async getAllFollowers(@Args() args: FollowPagination, @UserEntity() user: User) {
  //   return this.service.getAllFollowers(user.id)
  // }

  @Mutation(() => Followers)
  async followUser(@Args() args: FollowUserArgs, @UserEntity() user: User) {
    try {
      const followedBy = user.id
      const res = await this.service.createFollowing(args.userId, followedBy)
      return res
    } catch (error) {
      errHandler.handle(error)
    }
  }

  




}
