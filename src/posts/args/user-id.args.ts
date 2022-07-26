import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { GetAllPostInput } from '../dto/get-all-post.dto';

@ArgsType()
export class UserIdArgs extends GetAllPostInput {
  @IsNotEmpty()
  userId?: number;
}
