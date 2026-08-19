import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GenerateTokensDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(25)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(25)
  userEmail: string;
}
