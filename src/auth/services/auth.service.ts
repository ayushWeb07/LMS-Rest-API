import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { RegisterAuthDto } from '../dtos/register-auth.dto';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { HashingService } from './hashing.service';
import { User } from '../../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtAuthResponse } from '../interfaces/jwt-auth-response.interface';
import { GenerateTokensService } from './generate-tokens.service';
import { IGenerateTokensResponse } from '../interfaces/generate-tokens-response.interface';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensDto } from '../dtos/refresh-tokens.dto';

/** This is the Auth service */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly generateTokensService: GenerateTokensService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  async registerAuth(registerAuthDto: RegisterAuthDto): Promise<User> {
    // hash the password
    const passwordHash = await this.hashingService.hashPassword(
      registerAuthDto.password,
    );

    registerAuthDto.password = passwordHash;

    // call the users service
    const user = await this.usersService.createUser(registerAuthDto);
    return user;
  }

  async loginAuth(
    loginAuthDto: LoginAuthDto,
  ): Promise<IGenerateTokensResponse> {
    let user: User | null = null;

    // find the user by email
    try {
      user = await this.usersService.findUserByEmail({
        email: loginAuthDto.email,
      });
    } catch {
      throw new UnauthorizedException(
        'Incorrect credentials has been provided',
      );
    }

    // signup was done using google
    if (user.googleId) {
      throw new UnauthorizedException('Please login via Google');
    }

    // compare passwords
    const isPasswordsMatch = await this.hashingService.comparePasswords(
      loginAuthDto.password,
      user.password!,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException(
        `Incorrect credentials has been provided`,
      );
    }

    // generate tokens
    const { accessToken, refreshToken } =
      await this.generateTokensService.generateTokens({
        userId: user.id,
        userName: user.username,
        userEmail: user.email,
      });

    return {
      accessToken,
      refreshToken,
    };
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.usersService.findUserById({
      id: userId,
    });

    return user;
  }

  async refreshTokens(
    refreshTokensDto: RefreshTokensDto,
  ): Promise<IGenerateTokensResponse> {
    const tokens: IGenerateTokensResponse =
      await this.refreshTokensService.refreshTokens(refreshTokensDto);

    return tokens;
  }
}
