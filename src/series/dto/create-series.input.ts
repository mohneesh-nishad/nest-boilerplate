import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SeriesCreateDto {
    @Field(() => String)
    name: string
}