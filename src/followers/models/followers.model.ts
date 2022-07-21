import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "src/common/models/base.model";
import { User } from "src/users/entities";

@ObjectType()
export class IFollowers extends BaseModel {
  @Field(() => Int)
  userId: number

  @Field(() => Boolean)
  isFav: boolean

  @Field(() => Int)
  followedBy: number
}

