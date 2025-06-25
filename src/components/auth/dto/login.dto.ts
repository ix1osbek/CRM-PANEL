import { IsEmail, IsString } from 'class-validator';

export class SigninInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}