import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { PostOrderField } from "./post-order.input";

@InputType('getAllPostInput')
@ArgsType()
export class GetAllPostInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  limit?: number;

  @Field(() => PostOrderField)
  orderBy: PostOrderField
}