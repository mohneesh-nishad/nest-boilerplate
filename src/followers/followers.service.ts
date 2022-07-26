import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { resToJson } from 'src/common/jsonParser';
import { FOLLOWER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/entities';
import { Followers } from './entities';

@Injectable()
export class FollowersService {
  constructor(
    @Inject(FOLLOWER_REPOSITORY) private readonly followRepo: typeof Followers
  ) { }

  async createFollowing(userToFollow: number, followedBy: number) {
    if (userToFollow === followedBy) throw new BadRequestException('You cant follow yourself')
    const isFollowing = await this.followRepo.findOne({
      where: {
        followedBy: followedBy, userId: userToFollow
      }
    })
    if (isFollowing) throw new BadRequestException('You are already following this user')

    const follow = await this.followRepo.create({ followedBy: followedBy, userId: userToFollow })
    if (!follow) throw new Error('Error occured in following user..!!!')
    return follow.toJSON()
  }

  async getAllFollowers(id: number) {
    const { rows, count } = await this.followRepo.findAndCountAll({
      distinct: true,
      where: { userId: id },
      include: [{
        attributes: ['id', 'name', 'email', 'avatar'],
        model: User,
        as: 'follower'
      }]
    })
    const data = resToJson(rows)
    // console.log(data)
    return { data, count }

  }

  getAllFollowings = async (id: number, pageNumber: number = 1, pageSize: number = 10) => {
    let offset = pageSize * (pageNumber - 1);
    const { rows, count } = await this.followRepo.findAndCountAll({
      distinct: true,
      // subQuery: false,
      limit: pageSize,
      offset: offset,
      where: { followedBy: id },
      include: [{
        attributes: ["id", "name", "email", "avatar"],
        model: User,
        // where: { isDeleted: false, isVerified: true, isRegister: true },
        as: "following"
      }]
    });

    return { data: resToJson(rows), count }
  }


}
