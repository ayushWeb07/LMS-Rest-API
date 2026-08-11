import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllDto {
  @ApiPropertyOptional({
    description: 'Min price to filter',
    type: 'number',
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  minPrice: number;

  @ApiPropertyOptional({
    description: 'Category to filter',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  category: string;
}

export class FindOneDto {
  @ApiProperty({
    description: 'Id of the user',
    type: 'number',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
