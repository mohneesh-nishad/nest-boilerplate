import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Gender } from "src/common/enums/user-gender.enum";


@ArgsType()
@InputType()
export class UpdateProfileInput {
    @Field(() => Gender)
    @IsNotEmpty()
    gender: Gender;

    @Field(() => String)
    job?: string

    @Field(() => String)
    country?: string

    @Field(() => String)
    website?: string

    @Field(() => String)
    bio?: string
}