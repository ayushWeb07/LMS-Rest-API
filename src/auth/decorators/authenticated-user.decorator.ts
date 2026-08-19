import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IJwtAuthResponse } from '../interfaces/jwt-auth-response.interface';

export const AuthenticatedUser = createParamDecorator(
  (field: keyof IJwtAuthResponse, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request?.[field];
  },
);
