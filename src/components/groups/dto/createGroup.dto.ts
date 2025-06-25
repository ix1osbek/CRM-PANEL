import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsString()
  level: string;
}
