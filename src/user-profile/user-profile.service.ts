import { Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { USER_PROFILE_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/entities';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UserProfile } from './entities';

@Injectable()
export class UserProfileService {
    constructor(@Inject(USER_PROFILE_REPOSITORY) private readonly profileRepo: typeof UserProfile) { }

    async createProfile(userId: number, payload: UpdateProfileInput) {
        const profile = await this.profileRepo.create({ userId, ...payload }, {
            include: {
                model: User, where: { id: userId }
            }
        })
        console.log(profile)
        return profile.toJSON()
    }
}
