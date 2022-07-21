import { Followers } from './entities';
import { FOLLOWER_REPOSITORY } from '../core/constants';

export const followersProviders = [{
  provide: FOLLOWER_REPOSITORY,
  useValue: Followers,
}];