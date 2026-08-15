import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator';

export class FindMultipleTagsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsInt({ each: true })
  tagIds: number[];
}
