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
  @MinLength(60)
  @MaxLength(60)
  @Matches(/^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/, {
    message: 'Not a valid bcrypt hash',
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
