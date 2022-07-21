import { Field, Float, HideField, ID, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';


@ObjectType({ isAbstract: true })
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  firstName?: string;

  @Field(() => String)
  lastName?: string;

  @Field()
  dob?: Date;

  @Field(() => String)
  phoneNumber?: string;

  @Field(() => Int)
  userType?: number;

  @Field(() => Int)
  userInfo?: number; // 1 for xana or 2 for xanalia 3 for tcg

  @Field(() => String)
  walletAddress: string;

  @Field(() => String)
  nonce: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatar?: string;

  @Field(() => String)
  tcgAvatar: string;

  @HideField()
  password: string;

  @Field(() => Role)
  role: string;

  @Field(() => Float)
  coins: number;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Boolean)
  isRegister: boolean;

  @Field(() => Boolean)
  isDeleted: boolean

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: Date;

  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date;
}