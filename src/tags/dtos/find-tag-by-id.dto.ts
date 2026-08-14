import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FindTagByIdDto {
  /** Id of the tag */
  @ApiProperty({
    description: 'Id of the tag',
    type: 'number',
  })
  @Type(() => Number)
  @IsInt()
  id: number;
}
