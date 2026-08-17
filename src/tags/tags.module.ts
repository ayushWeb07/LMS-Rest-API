import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './services/tags.service';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [TagsService],
})
export class TagsModule {}
