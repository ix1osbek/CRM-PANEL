import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { DatabaseService } from '../../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
})
export class UserModule {}
