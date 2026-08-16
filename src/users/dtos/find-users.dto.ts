import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

export class FindUsersDto extends IntersectionType(PaginationQueryDto) {}
