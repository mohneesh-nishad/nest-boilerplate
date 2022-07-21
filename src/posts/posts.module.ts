import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { postsProviders } from './posts.provider';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [UsersModule],
  providers: [PostsResolver, ...postsProviders, PostsService],
})
export class PostsModule { }
