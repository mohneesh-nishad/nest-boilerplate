import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {

  // skip?: number;

  after?: string;

  before?: string;
  
  limit: number

  // first?: number;

  // last?: number;
}
