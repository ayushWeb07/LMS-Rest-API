import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { FindTagByIdDto } from './dtos/find-tag-by-id.dto';
import { DeleteTagDto } from './dtos/delete-tag.dto';
import { PatchTagDto } from './dtos/patch-tag.dto';

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

    return {
      message: 'Tag successfully fetched',
      tag,
    };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async patchTag(@Body() patchTagDto: PatchTagDto) {
    await this.tagsService.patchTag(patchTagDto);

    return {
      message: 'Tag successfully updated',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTag(@Param() deleteTagDto: DeleteTagDto) {
    await this.tagsService.deleteTag(deleteTagDto);

    return {
      message: 'Tag successfully deleted',
    };
  }
}
