import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IJwtAuthResponse } from '../../interfaces/jwt-auth-response.interface';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

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

    // verify the token
    try {
      const payload: IJwtAuthResponse =
        await this.jwtService.verifyAsync(token);

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
