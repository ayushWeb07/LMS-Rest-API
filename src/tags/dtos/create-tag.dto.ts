import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  @MaxLength(255)
  description: string;
}
