import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersResolver } from './followers.resolver';
import { followersProviders } from './followers.provider';
import { GlobalErrorHandler } from 'src/common/globalErrorHandler';

@Module({
  imports: [GlobalErrorHandler],
  providers: [FollowersService, FollowersResolver, ...followersProviders],
  exports: [FollowersService]
})
export class FollowersModule { }
