import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { ProfileResponse, UserResponse } from 'src/common/responses';
import { User } from 'src/users/entities';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UserProfileService } from './user-profile.service';


@UseGuards(GqlAuthGuard)
@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) { }

  @Query(() => ProfileResponse, { name: 'getMyProfile' })
  async getUserProfile(@UserEntity() user: User) {
    return this.userProfileService.getProfileByUserId(user.id)
  }


  @Mutation(() => UserResponse, { name: 'updateUserProfile' })
  async updateUserProfile(@Args('data') args: UpdateProfileInput, @UserEntity() user: User): Promise<any> {
    const { gender, job, country, website, bio } = args
    return this.userProfileService.updateProfile(user, args)

  }
}
