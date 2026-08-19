import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IServerConfig } from '../../config/interfaces/server_config.interface';
import { GenerateTokensDto } from '../dtos/generate-tokens.dto';
import { IJwtAuthResponse } from '../interfaces/jwt-auth-response.interface';
import { IGenerateTokensResponse } from '../interfaces/generate-tokens-response.interface';

@Injectable()
export class GenerateTokensService {
  private readonly serverConfig: IServerConfig;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  async generateTokens(
    generateTokensDto: GenerateTokensDto,
  ): Promise<IGenerateTokensResponse> {
    // build the payloads
    const accessPayload: IJwtAuthResponse = {
      ...generateTokensDto,
    };

    const refreshPayload = {
      userId: generateTokensDto.userId,
    };

    // generate the tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: this.serverConfig.jwtAccessSecretKey,
        expiresIn: `${this.serverConfig.jwtAccessExpires}s`,
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: this.serverConfig.jwtRefreshSecretKey,
        expiresIn: `${this.serverConfig.jwtRefreshExpires}s`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
