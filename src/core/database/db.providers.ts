import { Sequelize } from 'sequelize-typescript';
import { Followers } from 'src/followers/entities';
import { Post } from 'src/posts/entities';
import { Series } from 'src/series/entities';
import { UserLeague } from 'src/user-leagues/entities';
import { UserProfile } from 'src/user-profile/entities';
import { User } from 'src/users/entities';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { db_config } from '../envs';
import { dbLogger } from './db.logger';

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    let config;
    config = db_config();
    console.log(' INITIALIZING DB')
    console.log('CONFIG IS  ==========>>>')
    // config.models = [User, Post, Followers, UserProfile, UserLeague, Series]
    // config.modelMatch = (filename, member) => {
    //   return filename.substring(0, filename.indexOf('.entity')) === member.toLowerCase();
    // };
    config.benchmark = true
    config.logging = process.env.NODE_ENV === 'development' ? dbLogger : false
    console.log(config)

    const sequelize = new Sequelize(config);
    // this initializes models firsthand, Eager Loading
    sequelize.addModels([User, Post, Followers, UserProfile, UserLeague, Series]);
    //* this Invokes models lazily, not instanciated on launch
    // sequelize.addModels([process.cwd() + '/**/entities'])

    await sequelize.sync();
    // console.log(sequelize)
    return sequelize;
  },
}];