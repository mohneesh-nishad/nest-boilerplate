import { Field, InputType } from "@nestjs/graphql";
import { isEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UserCreateDto {

  email: string;

  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: false })
  password: string;
}