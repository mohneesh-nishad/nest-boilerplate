import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { resToJson } from 'src/common/jsonParser';
import { FOLLOWER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/entities';
import { Followers } from './entities';

@Injectable()
export class FollowersService {
  constructor(
    @Inject(FOLLOWER_REPOSITORY) private readonly followRepo: typeof Followers
  ) { }

  async createFollowing(userToFollow: number, followerId: number) {
    if (userToFollow === followerId) throw new ConflictException('You cant follow yourself')
    const isFollowing = await this.followRepo.findOne({
      where: {
        followedBy: followerId, userId: userToFollow
      }
    })
    if (isFollowing) throw new ConflictException('You are already following this user')

    const follow = await this.followRepo.create({ followedBy: followerId, userId: userToFollow })
    if (!follow) throw new Error('Error occured in following user..!!!')
    return follow.toJSON()
  }

  async getAllFollowers(id: number) {
    const { rows, count } = await this.followRepo.findAndCountAll({
      distinct: true,
      where: { followedBy: id },
      include: [{
        attributes: ['id', 'name', 'email', 'avatar'],
        model: User,
        as: 'following'
      }]
    })

    return { data: resToJson(rows), count }

  }


}
