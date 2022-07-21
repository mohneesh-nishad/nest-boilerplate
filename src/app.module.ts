import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import config from 'src/common/configs/config';
import { loggingMiddleware } from 'src/common/middleware/logging.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './core/database/db.module';

const dbDefaultConfig = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  // models: [],
  autoLoadModels: true,
  synchronize: true,
}



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    // PrismaModule.forRoot({
    //   isGlobal: true,
    //   prismaServiceOptions: {
    //     middlewares: [loggingMiddleware()], // configure your prisma middleware
    //   },
    // }),
    //** Sequelize */
    // SequelizeModule.forRoot({ dialect: 'postgres',...dbDefaultConfig }),
    DatabaseModule,

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
