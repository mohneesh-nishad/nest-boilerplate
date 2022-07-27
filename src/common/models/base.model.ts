import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, CreatedAt, DataType, Model, PrimaryKey } from 'sequelize-typescript';
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination';


export interface CursorOptions extends PaginateOptions<BaseModel> {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  cursor?: string
}
@ObjectType({ isAbstract: true })
export abstract class BaseModel extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Field({ description: 'Identifies the date and time when the object was created.' })
  @CreatedAt
  createdAt: Date;

  @Field({ description: 'Identifies the date and time when the object was last updated.' })
  @Column
  updatedAt: Date;


  declare static paginate: (options: CursorOptions) => Promise<PaginationConnection<Model>>
}

const options = {
  methodName: 'paginate',
  primaryKeyField: 'id',
};