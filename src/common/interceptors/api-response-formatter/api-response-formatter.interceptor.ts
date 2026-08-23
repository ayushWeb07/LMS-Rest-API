import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { IServerConfig } from '../../../config/interfaces/server_config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiResponseFormatterInterceptor implements NestInterceptor {
  private serverConfig: IServerConfig;

  constructor(private readonly configService: ConfigService) {
    // extract the server config from the config service
    const serverConfig = this.configService.get<IServerConfig>('server');

    if (!serverConfig) {
      throw new InternalServerErrorException(
        'Server configuration must be setup',
      );
    }

    this.serverConfig = serverConfig;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        apiVersion: this.serverConfig.apiVersion,
        data,
      })),
    );
  }
}
