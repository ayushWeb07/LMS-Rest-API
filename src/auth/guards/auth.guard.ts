import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';
import { SkipAuthGuard } from './skip-auth.guard';
import { AuthType } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly authGuardsMap: Record<AuthType, CanActivate>;
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly skipAuthGuard: SkipAuthGuard,
  ) {
    this.authGuardsMap = {
      [AuthType.JWT]: this.accessTokenGuard,
      [AuthType.NONE]: this.skipAuthGuard,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract the auth types from the reflector
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthType.JWT];

    // iterate over the extracted auth types and check if their guard can activate
    for (const type of authTypes) {
      const guard = this.authGuardsMap[type];

      const res = await guard.canActivate(context);

      if (res) {
        return true;
      }
    }

    throw new UnauthorizedException(
      'Access denied: You do not have the permissions to access this',
    );
  }
}
