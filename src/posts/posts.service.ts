import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { resToJson } from "src/common/jsonParser";
import { POST_REPOSITORY } from "src/core/constants";
import { User } from "src/users/entities";
import { Post } from "./entities";

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepo: typeof Post
  ) { }

  async createPost(data) {
    return (await this.postRepo.create(data)).toJSON()
  }

  async getUserPosts(page: number, limit: number, userId: number, orderBy: string = 'createdAt',) {
    // const { rows, count } = await this.postRepo.findAndCountAll({ where: { authorId: userId }, include: { model: User, as: 'author' } })
    // const { rows, count } = await this.postRepo.findAndCountAll({ where: { authorId: userId } })
    const offset = limit * (page - 1)
    const { rows, count } = await this.postRepo.findAndCountAll({
      distinct: true,
      offset: offset,
      limit: limit,
      where: { authorId: userId },
      order: [[orderBy, 'desc']]
    })
    return { data: resToJson(rows), count }
  }

  async getAllPosts(page: number, limit: number, orderBy: string) {
    const offset = limit * (page - 1)
    const { rows, count } = await this.postRepo.findAndCountAll({
      distinct: true,
      offset: offset,
      limit: limit,
      include: {
        attributes: ['id', 'name', 'email'],
        model: User
      },
      order: [[orderBy, 'desc']]
    })
    return { data: resToJson(rows), count }
  }


  async getSinglePostOfUser(postId: number, userId: number) {
    const post = await this.postRepo.findOne({ where: { id: postId, authorId: userId } })
    if (!post) throw new NotFoundException('Post not found')
    return post;
  }
}