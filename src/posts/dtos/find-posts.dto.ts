import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class FindPostsBaseDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;
}

export class FindPostsDto extends IntersectionType(
  FindPostsBaseDto,
  PaginationQueryDto,
) {}
