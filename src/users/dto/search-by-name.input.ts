import { Field, InputType } from "@nestjs/graphql";
import { isNotEmpty } from "class-validator";


@InputType()
export class SearchByNameInput {
  @Field({ nullable: false })
  name: string;
}