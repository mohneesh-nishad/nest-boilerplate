import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/models/base.model";
import { Series } from "src/series/entities";
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
    @ForeignKey(() => Series)
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


    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    rankByLeague: number

    @Field()
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    rankBySeries: number

}