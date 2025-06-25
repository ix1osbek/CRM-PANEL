import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  fullName: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  groupId?: string;
}
