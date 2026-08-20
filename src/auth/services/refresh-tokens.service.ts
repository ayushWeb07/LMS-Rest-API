import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IServerConfig } from '../../config/interfaces/server_config.interface';
import { RefreshTokensDto } from '../dtos/refresh-tokens.dto';
import type { IJwtAuthResponse } from '../interfaces/jwt-auth-response.interface';
import { IJwtRefreshPayload } from '../interfaces/jwt-refresh-payload.interface';
import { UsersService } from '../../users/services/users.service';
import { IJwtAccessPayload } from '../interfaces/jwt-access-payload.interface';
import { GenerateTokensService } from './generate-tokens.service';
import { IGenerateTokensResponse } from '../interfaces/generate-tokens-response.interface';

@Injectable()
export class RefreshTokensService {
  private readonly serverConfig: IServerConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
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

  async refreshTokens(
    refreshTokensDto: RefreshTokensDto,
  ): Promise<IGenerateTokensResponse> {
    try {
      // verify the refresh token
      const payload: IJwtRefreshPayload = await this.jwtService.verifyAsync(
        refreshTokensDto.refreshToken,
        {
          secret: this.serverConfig.jwtRefreshSecretKey,
        },
      );

      // fetch the user
      const user = await this.usersService.findUserById({
        id: payload.userId,
      });

      // build the payload for access token
      const accessPayload: IJwtAccessPayload = {
        userId: user.id,
        userEmail: user.email,
        userName: user.username,
      };

      // generate the tokens
      const tokens: IGenerateTokensResponse =
        await this.generateTokensService.generateTokens({
          userId: accessPayload.userId,
          userEmail: accessPayload.userEmail,
          userName: accessPayload.userName,
        });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
