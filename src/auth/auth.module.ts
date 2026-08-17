import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { HashingService } from './services/hashing.service';
import { BcryptService } from './services/bcrypt.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  imports: [UsersModule],
})
export class AuthModule {}
