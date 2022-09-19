import { forwardRef, Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';
import { usersProviders } from './users.provider';
import { User } from './entities';
import { FollowersModule } from 'src/followers/followers.module';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';
import { UserProfileModule } from 'src/user-profile/user-profile.module';
import { DatabaseModule } from 'src/core/database/db.module';

@Module({
  imports: [DatabaseModule, FollowersModule, forwardRef(() => PostsModule), UserProfileModule],
  providers: [UsersResolver, UsersService, PasswordService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule { }
