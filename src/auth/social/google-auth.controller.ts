import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GoogleAuthService } from './services/google-auth.service';
import { IGenerateTokensResponse } from '../interfaces/generate-tokens-response.interface';
import { GoogleAuthDto } from './dtos/google-auth.dto';
import { SetAuthType } from '../decorators/set-auth-type.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Controller('auth/google-auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @SetAuthType(AuthType.NONE)
  @Post()
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() googleAuthDto: GoogleAuthDto) {
    const tokens: IGenerateTokensResponse =
      await this.googleAuthService.authenticate(googleAuthDto);

    return {
      message: 'User successfully authenticated by google',
      tokens,
    };
  }
}
