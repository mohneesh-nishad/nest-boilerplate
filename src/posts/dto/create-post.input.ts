import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field({description: 'min lenth: 8'})
  @IsNotEmpty()
  @MinLength(8)
  content: string;

  @Field({description: 'min length: 3 chars'})
  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
