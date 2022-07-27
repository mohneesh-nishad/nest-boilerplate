import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";


export interface IResType<T> {
    payload: T;
    status: number;
    msg?: string
}

export function SingleResponse<T>(classRef: Type<T>): Type<IResType<T>> {

    @ObjectType({ isAbstract: true })
    abstract class ResType implements IResType<T>{
        @Field((type) => classRef, { nullable: true })
        payload: T;

        @Field((type) => Int)
        status: number;

        @Field((type) => String)
        msg?: string
    }

    return ResType as Type<IResType<T>>
}