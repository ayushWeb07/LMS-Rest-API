import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUserDto {
  /** Id of the user */
  @ApiProperty({
    description: 'Id of the user',
    type: 'number',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
