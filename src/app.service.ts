import { Injectable } from '@nestjs/common';

/** This is the App service */
@Injectable()
export class AppService {
  /** This is the Hello service function */
  getHello(): string {
    return 'Hello World from Nest!';
  }
}
