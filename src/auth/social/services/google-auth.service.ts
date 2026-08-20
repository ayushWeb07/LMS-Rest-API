import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { IServerConfig } from '../../../config/interfaces/server_config.interface';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private authClient: OAuth2Client;
  private readonly serverConfig: IServerConfig;

  constructor(
    private readonly usersService: UsersService,
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

  onModuleInit() {
    this.authClient = new OAuth2Client(
      this.serverConfig.googleClientId,
      this.serverConfig.googleClientSecret,
    );
  }
}
