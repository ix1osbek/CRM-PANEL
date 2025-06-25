import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DatabaseService } from '../../prisma/prisma.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, DatabaseService],
})
export class StudentsModule {}
