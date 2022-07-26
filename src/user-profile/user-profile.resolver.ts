import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UserProfileService } from './user-profile.service';


@UseGuards(GqlAuthGuard)
@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) { }

  @Mutation(() => User)
  async updateUserProfile(@Args('data') args: UpdateProfileInput, @UserEntity() user: User) {
    const { gender, job, country, website, bio } = args
    console.log(args)
    console.log(user)
    // return {}
    return this.userProfileService.createProfile(user.id, args)
  }
}
