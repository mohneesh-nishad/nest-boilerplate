import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { Body, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UserResponse } from './models/user.model.old';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SearchByNameInput } from './dto/search-by-name.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    // private prisma: PrismaService
  ) { }

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    // console.log(user)
    return user;
  }

  @Query(() => UserResponse)
  async allUsers(): Promise<any> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async getSingleUser(@UserEntity() user: User) {
    return this.usersService.getSingleUser(user.id)
  }

  @Query(() => UserResponse)
  async searchUserByName(
    @UserEntity() user: User,
    @Args('data') data: SearchByNameInput
  ) {
    return this.usersService.findUserByName(data.name)
  }



  /**
   * Mutations start from here 
   */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  /**
   *  Field Resolver
   */

  @ResolveField()
  firstName(@Parent() parent: User) {
    if (parent.firstName) return parent.firstName
    return parent.name.split(' ')[0]
  }
  @ResolveField()
  lastName(@Parent() parent: User) {
    if (parent.lastName) return parent.lastName
    return parent.name.split(' ')[1]
  }
  // posts(@Parent() author: User) {
  //   // if (author.posts) {
  //   //   return author.posts
  //   // }
  //   console.log('still doing query call..???')
  //   // return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  // }
}
