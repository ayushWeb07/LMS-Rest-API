import { CreatePostDto } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

/** This is DTO for updating a post */
export class PatchPostDto extends PartialType(CreatePostDto) {
  /** Id of the user */
  @ApiProperty({
    description: 'Id of the user',
    type: 'number',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
