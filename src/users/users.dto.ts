import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** This is DTO for finding all the users */
export class FindAllDto {
  /** Min price to filter */
  @ApiPropertyOptional({
    description: 'Min price to filter',
    type: 'number',
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  minPrice: number;

  /** Category to filter */
  @ApiPropertyOptional({
    description: 'Category to filter',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  category: string;
}

/** This is DTO for finding a specific user */
export class FindOneDto {
  /** Id of the user */
  @ApiProperty({
    description: 'Id of the user',
    type: 'number',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
