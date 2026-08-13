import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeletePostDto {
  /** Id of the user */
  @ApiProperty({
    description: 'Id of the user',
    type: 'number',
  })
  @Type(() => Number)
  @IsInt()
  id: number;
}
