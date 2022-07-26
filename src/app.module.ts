import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import config from 'src/common/configs/config';
// import { loggingMiddleware } from 'src/common/middleware/logging.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './core/database/db.module';
import { FollowersModule } from './followers/followers.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserLeaguesModule } from './user-leagues/user-leagues.module';
import { SeriesResolver } from './series/series.resolver';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),

    DatabaseModule,

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UsersModule,
    PostsModule,
    FollowersModule,
    UserProfileModule,
    UserLeaguesModule,
    SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, SeriesResolver],
})
export class AppModule { }
