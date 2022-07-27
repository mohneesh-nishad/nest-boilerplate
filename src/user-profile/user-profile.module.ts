import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { userProfileProviders } from './users-profile.provider';

@Module({
  providers: [UserProfileResolver, UserProfileService, ...userProfileProviders],
  exports: [UserProfileService]
})
export class UserProfileModule { }
