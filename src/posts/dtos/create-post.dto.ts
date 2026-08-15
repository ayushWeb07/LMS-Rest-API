import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '../enums/post-type.enum';
import { PostStatusEnum } from '../enums/post-status.enum';
import { CreateMetaOptionDto } from '../../meta-options/dtos/create-meta-option.dto';
import { Type } from 'class-transformer';

/** This is DTO for creating a post */
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    name: 'title',
    description: 'Title of the post',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(1024)
  @ApiProperty({
    name: 'content',
    description: 'Content of the post',
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(1024)
  @ApiProperty({
    name: 'thumbnailUrl',
    description: 'Thumbnail url of the post',
  })
  thumbnailUrl: string;

  @IsEnum(PostTypeEnum)
  @ApiProperty({
    enum: PostTypeEnum,
    enumName: 'postType',
    description: 'Type of the post',
  })
  postType: PostTypeEnum;

  @IsEnum(PostStatusEnum)
  @ApiProperty({
    enum: PostStatusEnum,
    enumName: 'postStatus',
    description: 'Status of the post',
  })
  postStatus: PostStatusEnum;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsInt({ each: true })
  tagIds: number[];

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateMetaOptionDto)
  metaOption: CreateMetaOptionDto;

  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
