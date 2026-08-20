import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { HashingService } from './services/hashing.service';
import { BcryptService } from './services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthGuard } from './guards/auth.guard';
import { SkipAuthGuard } from './guards/skip-auth.guard';
import { GenerateTokensService } from './services/generate-tokens.service';
import { RefreshTokensService } from './services/refresh-tokens.service';
import { GoogleAuthController } from './social/google-auth.controller';
import { GoogleAuthService } from './social/services/google-auth.service';

@Module({
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AccessTokenGuard,
    SkipAuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    GenerateTokensService,
    RefreshTokensService,
    GoogleAuthService,
  ],
  imports: [JwtModule.register({}), UsersModule],
})
export class AuthModule {}
