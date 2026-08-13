import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(25)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(25)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8}$/)
  password: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
