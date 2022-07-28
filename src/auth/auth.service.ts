import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.entity';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities';
import { Auth } from './models/auth.entity';
import { UserLeaguesService } from 'src/user-leagues/user-leagues.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly prisma: PrismaService,
    private readonly user: UsersService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly userLeagues: UserLeaguesService
  ) { }

  async createUser(payload: SignupInput): Promise<Auth> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const emailExist = await this.user.findOneByEmail(payload.email);
      if (emailExist) throw new ConflictException;
      const user = await this.user.create({ ...payload, password: hashedPassword });
      // console.log(user.toJSON())
      await this.userLeagues.createLeague(user.id)
      return {
        user: user.toJSON(),
        ...this.generateTokens({
          userId: user.id,
        })
      }
    } catch (e) {
      if (e instanceof ConflictException)
        throw new ConflictException(`Email ${payload.email} already used.`);
      console.log(e)
      throw new HttpException(e.message, 400);
    }
  }

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.user.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return {
      ...this.generateTokens({
        userId: user.id,
      }), user
    };
  }

  validateUser(userId: number): Promise<any> {
    return this.user.findOneById(userId);
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.user.findOneById(id);
  }

  generateTokens(payload: { userId: string | number }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string | number }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string | number }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
