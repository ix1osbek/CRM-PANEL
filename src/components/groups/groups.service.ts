import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly db: DatabaseService) {}
  create(data: CreateGroupDto) {
    return this.db.group.create({
      data,
    });
  }




  findAll() {
    return this.db.group.findMany();
  }

  findOne(teamId: string) {
    return this.db.group.findUnique({
      where: { id: teamId },
    });
  }

  update(teamId: string, data: UpdateGroupDto) {
    return this.db.group.update({
      where: { id: teamId },
      data,
    });
  }

  remove(teamId: string) {
    return this.db.group.delete({
      where: { id: teamId },
    });
  }
}
