import { Field, ObjectType } from "@nestjs/graphql";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";
import { User } from "src/users/entities";


@Table({ tableName: 'userLeagues', timestamps: true })
@ObjectType('UserLeague')
export class UserLeague extends BaseModel {
    @Field()
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false })
    leagueId: number;

    @Field({ nullable: true })
    @Column({ type: DataType.INTEGER, allowNull: true })
    seriesId: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    rating: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    battles: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    wins: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    loose: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    draw: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    maxStreak: number;

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    rewards: number;

}