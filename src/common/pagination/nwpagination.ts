import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export default function Paginator<TItem>(TItemClass: Type<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {

    @Field(() => [TItemClass], { nullable: true })
    payload?: TItem[]

    @Field(() => Int, { nullable: true })
    page?: number

    @Field(() => Int, { nullable: true })
    limit?: number

    @Field(() => Int)
    count?: number

    @Field(() => String, { nullable: true })
    status?: string

    @Field(() => String, { nullable: true })
    msg?: string
  }
  return PaginatedType;
}