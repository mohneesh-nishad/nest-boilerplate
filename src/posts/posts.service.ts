import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Op } from "sequelize";
import { resToJson } from "src/common/jsonParser";
import { POST_REPOSITORY } from "src/core/constants";
import { User } from "src/users/entities";
import { PostOrder } from "./dto/post-order.input";
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


  async getPublishedPosts(query: string, limit: number = 5, after?: string, before?: string, orderBy?: PostOrder) {

    // if ((first || after) && (last || before)) throw new BadRequestException(`Only 'first with after' and 'before with last' works. Other combination not supported simultaneously`)

    if (after && before) throw new BadRequestException('cant use both after/before options simultaneously.');
    const where_clause = { title: { [Op.iLike]: `%${query}%` } }

    const paginationOpts: any = { order: orderBy ? [orderBy.field, orderBy.direction] : null, where: where_clause, limit }
    if (after && !before) paginationOpts.after = after
    else if (!after && before) paginationOpts.before = before
    // const data = await this.postRepo.paginate({ where: where_clause, first, after, last, before, cursor, order: orderBy ? [orderBy.field, orderBy.direction] : [] })
    const data = await this.postRepo.paginate(paginationOpts)
    // console.log(data)
    const edgesCount = data.edges.length
    // const totalCount = await this.postRepo.count({ where: where_clause })
    return { ...data, edgesCount }
  }

  async getSinglePostOfUser(postId: number, userId: number) {
    const post = await this.postRepo.findOne({ where: { id: postId, authorId: userId } })
    if (!post) throw new NotFoundException('Post not found')
    return post;
  }
}