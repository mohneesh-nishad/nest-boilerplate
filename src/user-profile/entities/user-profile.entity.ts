import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, HasOne, Model, Table, Unique } from "sequelize-typescript";
import { Gender } from "src/common/enums/user-gender.enum";
import { BaseModel } from "src/common/models/base.model";
import { User } from "../../users/entities/users.entity";

@Table({ tableName: 'userProfiles', timestamps: true })
@ObjectType('UserProfile')
export class UserProfile extends BaseModel {

    @Field()
    @Unique({ name: 'userId', msg: 'It must be unique' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => User)
    // @BelongsTo(() => User, 'userId')
    userId: number;

    @Field(() => Gender, { nullable: true })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: Gender.MALE })
    gender: Gender;

    @Field({ nullable: true })
    @Column({ type: DataType.TEXT, allowNull: true, defaultValue: null })
    job: string;

    @Field({ nullable: true })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    country: string;

    @Field({ nullable: true })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    website: string;

    @Field({ nullable: true })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    bio: string;

    @Field({ nullable: true })
    @DeletedAt
    isDeleted: Date

    // @HideField()
    // // @ForeignKey(() => User)
    // @BelongsTo(() => User)
    // user: User
}