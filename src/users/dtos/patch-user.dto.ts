import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/** This is DTO for updating a post */
export class PatchUserDto extends PartialType(CreateUserDto) {}
