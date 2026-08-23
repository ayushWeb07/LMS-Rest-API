import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { IServerConfig } from '../../../config/interfaces/server_config.interface';
import { GoogleAuthDto } from '../dtos/google-auth.dto';
import { User } from '../../../users/user.entity';
import { GenerateTokensService } from '../../services/generate-tokens.service';
import { IGenerateTokensResponse } from '../../interfaces/generate-tokens-response.interface';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private authClient: OAuth2Client;
  private serverConfig: IServerConfig;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly generateTokensService: GenerateTokensService,
  ) {
    // extract the server config from the config service
    const serverConfig = this.configService.get<IServerConfig>('server');

    if (!serverConfig) {
      throw new InternalServerErrorException(
        'Server configuration must be setup',
      );
    }

    this.serverConfig = serverConfig;
  }

  onModuleInit(): void {
    // instantiate the auth client
    this.authClient = new OAuth2Client(
      this.serverConfig.googleClientId,
      this.serverConfig.googleClientSecret,
    );
  }

  async authenticate(
    googleAuthDto: GoogleAuthDto,
  ): Promise<IGenerateTokensResponse> {
    // verify the token
    const ticket = await this.authClient.verifyIdToken({
      idToken: googleAuthDto.token,
    });

    // extract the payload
    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException(
        'Something went wrong while authenticating with google',
      );
    }

    const { email, name, sub: googleId } = payload;

    if (!email || !name) {
      throw new UnauthorizedException(
        'Something went wrong while fetching the username and email on google authentication',
      );
    }

    // find user by email, else generate new user if not found
    let user: User | null = null;

    try {
      user = await this.usersService.findUserByEmail({
        email,
      });
    } catch {
      // create the new user
      user = await this.usersService.createUser({
        username: name,
        email: email,
        googleId,
      });
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
}
