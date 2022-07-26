import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, ArgsType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class SignupInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;
}
