import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './createGroup.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
