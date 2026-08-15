import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { FindTagByIdDto } from './dtos/find-tag-by-id.dto';
import { DeleteTagDto } from './dtos/delete-tag.dto';

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

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllTags() {
    const tags = await this.tagsService.findAllTags();
    return {
      message: 'All the tags successfully fetched',
      tags,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findTagById(@Param() findTagByIdDto: FindTagByIdDto) {
    const tag = await this.tagsService.findTagById(findTagByIdDto);

    if (!tag) {
      throw new HttpException('Such tag does not exist', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Tag successfully fetched',
      tag,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTag(@Param() deleteTagDto: DeleteTagDto) {
    const isTagDeleted = await this.tagsService.deleteTag(deleteTagDto);

    if (!isTagDeleted) {
      throw new HttpException('Such tag does not exist', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Tag successfully deleted',
    };
  }
}
