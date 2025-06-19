import { Module } from '@nestjs/common';
import { AuthService } from './users.service';
import { AuthController } from './users.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class UsersModule {}
