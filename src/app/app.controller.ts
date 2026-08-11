import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/** This is the App controller */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** This is the Hello get route */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
