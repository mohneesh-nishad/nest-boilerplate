import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { USER_REPOSITORY } from '../core/constants';
import { User } from './entities';
import { UserCreateDto } from './dto/user-create.dto';
import { UserBulkRes } from './interfaces/users-bulkres.interface';


@Injectable()
export class UsersService {
  constructor(
    // private prisma: PrismaService,
    @Inject(USER_REPOSITORY) private readonly userRepo: typeof User,
    private passwordService: PasswordService
  ) { }

  async create(user: UserCreateDto): Promise<User> {
    const nUser = await this.userRepo.create<User>(user);
    // console.log(nUser);
    return nUser
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepo.findOne<User>({ where: { id } });
  }

  async findAll(): Promise<UserBulkRes> {
    const res = await this.userRepo.findAndCountAll()
    res.rows = res.rows.map(r => r.toJSON())
    // console.log(res.rows)
    return { payload: res.rows, msg: 'Users list fetched', count: res.count, status: 'success' }
  }

  async findOne(arg) {
    const user = await this.userRepo.findOne(arg)
    return { paylaod: user || [], msg: 'Users list fetched', status: 200 }
  }


  async updateUser(userId: number, newUserData: UpdateUserInput) {
    // return this.prisma.user.update({
    //   data: newUserData,
    //   where: {
    //     id: userId,
    //   },
    // });
  }

  async getSingleUser(userId: number) {
    // return this.prisma.user.findUnique({
    //   where: { id: userId },
    //   include: { posts: true }
    // })
  }

  async findUserByName(name: string): Promise<any> {
    // const users = await this.prisma.user.aggregate({
    //   where: { firstname: { equals: name, mode: 'insensitive' } },
    //   _count: true,
    //   orderBy: { createdAt: 'asc' },
    // })
    // if (!users._count) {
    //   return { payload: [], msg: 'cant find user with this', count: users._count }
    // }
    // console.log(users)
    // return { payload: <any>users, msg: 'search result of user by name', count: users._count }
  }

  async changePassword(
    userId: number,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    // return this.prisma.user.update({
    //   data: {
    //     password: hashedPassword,
    //   },
    //   where: { id: userId },
    // });
  }
}
