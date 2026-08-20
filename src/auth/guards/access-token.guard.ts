import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import type { IJwtAuthResponse } from '../interfaces/jwt-auth-response.interface';
import { IJwtAccessPayload } from '../interfaces/jwt-access-payload.interface';
import { ConfigService } from '@nestjs/config';
import { IServerConfig } from '../../config/interfaces/server_config.interface';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  private readonly serverConfig: IServerConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract request from execution context
    const request: Request = context.switchToHttp().getRequest();

    // get the token from headers
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException(
        'Access denied: No token has been provided',
      );
    }

    // check if starts with bearer
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Access denied: Token must be in bearer format',
      );
    }

    // extract the token
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException(
        'Access denied: Invalid token has been provided',
      );
    }

    // verify the access token
    try {
      const payload: IJwtAccessPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.serverConfig.jwtAccessSecretKey,
        },
      );

      // attach the user details to the request
      request.userId = payload.userId;
      request.userEmail = payload.userEmail;
    } catch {
      throw new UnauthorizedException(
        'Access denied: Invalid or expired token has been provided',
      );
    }

    return true;
  }
}
