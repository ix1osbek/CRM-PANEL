import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { GroupsService } from './groups.service'
import { CreateGroupDto } from './dto/createGroup.dto'
import { UpdateGroupDto } from './dto/updateGroup.dto'

@Controller('teams')
export class TeamController {
  constructor(private readonly groupService: GroupsService) { }

  @Post('add')
  addTeam(@Body() input: CreateGroupDto) {
    return this.groupService.create(input)
  }

  @Get('list')
  fetchAll() {
    return this.groupService.findAll()
  }

  @Get('view/:id')
  fetchOne(@Param('id') id: string) {
    return this.groupService.findOne(id)
  }

  @Patch('edit/:id')
  modify(@Param('id') id: string, @Body() input: UpdateGroupDto) {
    return this.groupService.update(id, input)
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.groupService.remove(id)
  }
}
