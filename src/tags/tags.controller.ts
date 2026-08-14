import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTag(@Body() createTagDto: CreateTagDto) {
    const tag = await this.tagsService.createTag(createTagDto);

    return {
      message: 'Tag successfully created',
      tag,
    };
  }
}
