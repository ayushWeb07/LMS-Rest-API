import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { FindTagByIdDto } from '../dtos/find-tag-by-id.dto';
import { FindMultipleTagsDto } from '../dtos/find-multiple-tags.dto';
import { DeleteTagDto } from '../dtos/delete-tag.dto';
import { PatchTagDto } from '../dtos/patch-tag.dto';

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
    const tags = await this.tagsRepository.find();
    return tags;
  }

  async findTagById(findTagByIdDto: FindTagByIdDto): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({
      where: {
        id: findTagByIdDto.id,
      },
    });

    if (!tag) {
      throw new NotFoundException(
        `Tag with id '${findTagByIdDto.id}' does not exist`,
      );
    }

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

  async patchTag(patchTagDto: PatchTagDto): Promise<void> {
    // find the tag
    const tag = await this.tagsRepository.findOne({
      where: {
        id: patchTagDto.id,
      },
    });

    if (!tag) {
      throw new NotFoundException(
        `Tag with id '${patchTagDto.id}' does not exist`,
      );
    }

    // update it
    await this.tagsRepository.update(
      {
        id: patchTagDto.id,
      },
      {
        ...patchTagDto,
      },
    );
  }

  async deleteTag(deleteTagDto: DeleteTagDto): Promise<void> {
    // find the tag
    const tag = await this.tagsRepository.findOne({
      where: {
        id: deleteTagDto.id,
      },
    });

    if (!tag) {
      throw new NotFoundException(
        `Tag with id '${deleteTagDto.id}' does not exist`,
      );
    }

    // delete the tag
    await this.tagsRepository.delete({
      id: deleteTagDto.id,
    });
  }
}
