import { forwardRef, Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';
import { usersProviders } from './users.provider';
import { User } from './entities';
import { FollowersModule } from 'src/followers/followers.module';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [FollowersModule, forwardRef(() => PostsModule)],
  providers: [UsersResolver, UsersService, PasswordService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule { }
