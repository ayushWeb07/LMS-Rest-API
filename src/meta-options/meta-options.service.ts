import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { Repository } from 'typeorm';
import { CreateMetaOptionDto } from './dtos/create-meta-option.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  async createMetaOption(
    createMetaOptionDto: CreateMetaOptionDto,
  ): Promise<MetaOption> {
    // create
    let newMetaOption = this.metaOptionRepository.create(createMetaOptionDto);

    // save
    newMetaOption = await this.metaOptionRepository.save(newMetaOption);
    return newMetaOption;
  }
}
