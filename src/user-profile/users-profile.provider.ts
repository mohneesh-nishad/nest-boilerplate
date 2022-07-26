import { USER_PROFILE_REPOSITORY } from '../core/constants';
import { UserProfile } from './entities';

export const userProfileProviders = [{
    provide: USER_PROFILE_REPOSITORY,
    useValue: UserProfile,
}];