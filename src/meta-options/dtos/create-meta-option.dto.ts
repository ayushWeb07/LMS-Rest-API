import { IsJSON, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMetaOptionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsJSON()
  options: string;
}
