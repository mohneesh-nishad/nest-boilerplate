import { ArgsType, Field } from "@nestjs/graphql";

enum FollowSortBy {
  createdAt,
  isFav
}

enum SortOrder {
  asc,
  desc
}


@ArgsType()
export class FollowPagination {
  page?: number;

  // @Field(() => Number, { defaultValue: 1 })
  limit?: number;

  // filter?: 

  sortBy?: FollowSortBy

  sortOrder?: SortOrder
}