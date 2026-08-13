import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '../enums/post-type.enum';
import { PostStatusEnum } from '../enums/post-status.enum';

/** This is DTO for creating a post */
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(35)
  @ApiProperty({
    name: 'title',
    description: 'Title of the post',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(25)
  @MaxLength(500)
  @ApiProperty({
    name: 'content',
    description: 'Content of the post',
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty({
    name: 'slug',
    description: 'Slug of the post',
  })
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(35)
  @ApiProperty({
    name: 'schema',
    description: 'Schema of the post',
  })
  schema: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  @ApiProperty({
    name: 'thumbnailUrl',
    description: 'Thumbnail url of the post',
  })
  thumbnailUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(10, { each: true })
  @ApiProperty({
    name: 'tags',
    description: 'Tags of the post',
  })
  tags: string[];

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
}
