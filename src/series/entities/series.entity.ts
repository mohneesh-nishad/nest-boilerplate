import { Field, ObjectType } from "@nestjs/graphql";
import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";

@Table({ tableName: 'series' })
@ObjectType('Series')
export class Series extends BaseModel {
    @Field(() => String)
    @Column({ type: DataType.STRING, allowNull: false })
    name: string
}