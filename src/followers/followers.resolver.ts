import { BadRequestException, ConflictException, HttpException, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
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

@UseGuards(GqlAuthGuard)
@Resolver()
export class FollowersResolver {
  constructor(private service: FollowersService) { }

  @Mutation(() => IFollowers)
  async followUser(@Args() args: FollowUserArgs, @UserEntity() user: User) {
    try {
      const res = await this.service.createFollowing(args.userId, user.id)
      return res
    } catch (error) {
      errHandler.handle(error)
    }
  }
}
