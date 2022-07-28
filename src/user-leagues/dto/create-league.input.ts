import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";


@InputType()
export class LeagueCreateDto {
    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int, { defaultValue: 1 })
    leagueId: number

    @IsInt()
    @Field(() => Int, { defaultValue: 1 })
    seriesId: number

    @IsInt()
    @Field(() => Int, { defaultValue: 0 })
    rating: number
}