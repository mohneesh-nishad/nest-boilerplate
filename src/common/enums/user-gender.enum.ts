import { registerEnumType } from "@nestjs/graphql";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'others'
}

registerEnumType(Gender, {
    name: 'Gender',
    description: 'User Gender',
});