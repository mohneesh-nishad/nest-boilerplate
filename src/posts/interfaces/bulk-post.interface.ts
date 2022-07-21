import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IPost } from "../models/post.model";

@ObjectType()
export class PostBulkRes {

  @Field(() => [IPost])
  payload: IPost[];

  @Field(() => Int)
  count: number

  @Field()
  status?: string

  @Field()
  msg?: string
}