import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginAuthDto {
  /** Email */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** Password */
  @IsString()
  @IsNotEmpty()
  @Length(8)
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$')
  password: string;
}
