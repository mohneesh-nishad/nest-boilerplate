import { Field, ObjectType } from "@nestjs/graphql";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Gender } from "src/common/enums/user-gender.enum";
import { User } from "../../users/entities/users.entity";

@Table({ tableName: 'userProfiles' })
@ObjectType('userProfile')
export class UserProfile extends Model<UserProfile> {
    @Field()
    @Column({ type: DataTypes.INTEGER, allowNull: false })
    @ForeignKey(() => User)
    userId: number;

    @Field(() => Gender, { nullable: true })
    @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
    gender: Gender;

    @Field({ nullable: true })
    @Column({ type: DataTypes.TEXT, allowNull: true, defaultValue: null })
    job: string;

    @Field({ nullable: true })
    @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
    country: string;

    @Field({ nullable: true })
    @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
    website: string;

    @Field({ nullable: true })
    @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
    bio: string;

    @Field({ nullable: true })
    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    isDeleted: Boolean
}