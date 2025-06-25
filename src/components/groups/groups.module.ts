import { Module } from '@nestjs/common';
import { TeamController } from './groups.controller';
import { GroupsService } from './groups.service';
import { DatabaseService } from '../../prisma/prisma.service';

@Module({
  controllers: [TeamController],
  providers: [GroupsService, DatabaseService],
})
export class GroupsModule {}
