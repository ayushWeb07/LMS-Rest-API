import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

/** This is DTO for updating a post */
export class PatchUserDto extends PartialType(CreateUserDto) {
  /** Id of the user */
  @ApiProperty({
    description: 'Id of the user',
    type: 'number',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
