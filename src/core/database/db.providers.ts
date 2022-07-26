import { Sequelize } from 'sequelize-typescript';
import { Followers } from 'src/followers/entities';
import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { db_config } from '../envs';

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    let config;
    config = db_config();
    console.log(' INITIALIZING DB')
    console.log('CONFIG IS  ==========>>>')
    console.log(config)
    const sequelize = new Sequelize(config);
    sequelize.addModels([User, Post, Followers]);
    // sequelize.addModels([process.cwd() + '/**/*.entity.ts'])
    // sequelize.addModels([process.cwd() + '/**/entities'])
    await sequelize.sync();
    return sequelize;
  },
}];