import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, isEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UserCreateDto {

  @IsEmail()
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