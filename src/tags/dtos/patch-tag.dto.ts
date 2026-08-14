import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTagDto } from './create-tag.dto';

/** This is DTO for updating a tag */
export class PatchTagDto extends PartialType(CreateTagDto) {
  /** Id of the tag */
  @ApiProperty({
    description: 'Id of the tag',
    type: 'number',
  })
  @Type(() => Number)
  @IsInt()
  id: number;
}
