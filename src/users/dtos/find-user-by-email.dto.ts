import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class FindUserByEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(25)
  email: string;
}
