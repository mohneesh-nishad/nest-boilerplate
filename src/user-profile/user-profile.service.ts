import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { USER_PROFILE_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/entities';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UserProfile } from './entities';

@Injectable()
export class UserProfileService {
    constructor(@Inject(USER_PROFILE_REPOSITORY) private readonly profileRepo: typeof UserProfile) { }

    async createProfile(user: User, payload: UpdateProfileInput) {
        const profile = await this.profileRepo.create({ userId: user.id, ...payload })
        // console.log(profile.toJSON())
        const result = { ...user.toJSON(), profile }
        return { payload: result, status: 200, msg: 'created profile' }
        // return profile.toJSON()
    }


    async getProfileByUserId(userId: number) {
        const profile = await this.profileRepo.findOne({ where: { userId: userId } })
        // if (!profile) throw new NotFoundException('User Profile Not Found')
        // console.log(profile.toJSON())
        return { payload: profile, status: 200, msg: 'User profile fetched' }
    }


    async updateProfile(user: User, args: UpdateProfileInput) {
        try {
            const getProfile = await this.profileRepo.findOne({ where: { userId: user.id } })
            if (getProfile) {
                const [success, rows] = await this.profileRepo.update(args, { where: { userId: user.id }, returning: true })
                if (!success) throw new InternalServerErrorException
                const result = { ...user.toJSON(), profile: rows[0].toJSON() }
                return { payload: result, status: 200, msg: 'User profile updated' }
            } else {
                return this.createProfile(user, args)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}
