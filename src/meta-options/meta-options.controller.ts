import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreateMetaOptionDto } from './dtos/create-meta-option.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createMetaOption(@Body() createMetaOptionDto: CreateMetaOptionDto) {
    const metaOption =
      await this.metaOptionsService.createMetaOption(createMetaOptionDto);
    return {
      message: 'Meta option successfully created',
      metaOption,
    };
  }
}
