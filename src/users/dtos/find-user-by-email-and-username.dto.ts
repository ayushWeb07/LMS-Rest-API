import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FindUserByEmailAndUsernameDto {
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
}
