import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';
import { usersProviders } from './users.provider';
import { User } from './entities';
import { FollowersModule } from 'src/followers/followers.module';

@Module({
  imports: [FollowersModule],
  providers: [UsersResolver, UsersService, PasswordService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule { }
