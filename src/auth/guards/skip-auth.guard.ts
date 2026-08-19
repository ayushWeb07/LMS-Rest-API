import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SkipAuthGuard implements CanActivate {
  canActivate(
    _context: ExecutionContext,
  ): boolean {
    return true;
  }
}
