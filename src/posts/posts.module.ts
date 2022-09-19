import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/db.module';
import { UsersModule } from 'src/users/users.module';
import { postsProviders } from './posts.provider';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [forwardRef(() => UsersModule), DatabaseModule],
  providers: [PostsResolver, ...postsProviders, PostsService],
  exports: [PostsService]
})
export class PostsModule { }
