import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './dtos/create-tag.dto';
import { FindTagByIdDto } from './dtos/find-tag-by-id.dto';
import { FindMultipleTagsDto } from './dtos/find-multiple-tags.dto';
import { DeleteTagDto } from './dtos/delete-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    // create the tag instance
    let newTag = this.tagsRepository.create(createTagDto);

    // save it
    newTag = await this.tagsRepository.save(newTag);
    return newTag;
  }

  async findAllTags(): Promise<Tag[]> {
    const tags = await this.tagsRepository.find({
      relations: {
        posts: true,
      },
    });
    return tags;
  }

  async findTagById(findTagByIdDto: FindTagByIdDto): Promise<Tag | null> {
    const tag = await this.tagsRepository.findOne({
      where: {
        id: findTagByIdDto.id,
      },
      relations: {
        posts: true,
      },
    });

    return tag;
  }

  async findMultipleTags(
    findMultipleTagsDto: FindMultipleTagsDto,
  ): Promise<Tag[]> {
    const tags = await this.tagsRepository.find({
      where: {
        id: In(findMultipleTagsDto.tagIds),
      },
    });

    return tags;
  }

  async deleteTag(deleteTagDto: DeleteTagDto): Promise<boolean> {
    // find the tag
    const tag = await this.tagsRepository.findOne({
      where: {
        id: deleteTagDto.id,
      },
    });

    if (!tag) return false;

    // delete the tag
    await this.tagsRepository.delete({
      id: deleteTagDto.id,
    });

    return true;
  }
}
