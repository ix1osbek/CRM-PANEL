
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    role: string;
}