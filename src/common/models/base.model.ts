import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, CreatedAt, DataType, Model, PrimaryKey } from 'sequelize-typescript';

@ObjectType({ isAbstract: true })
export abstract class BaseModel extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  @CreatedAt
  createdAt: Date;
  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  @Column
  updatedAt: Date;
}
