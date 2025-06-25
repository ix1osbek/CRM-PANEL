import { IsEmail, IsString } from 'class-validator';

export class SignupInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
