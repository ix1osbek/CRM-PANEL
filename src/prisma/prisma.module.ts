import { Module } from '@nestjs/common';
import { DatabaseService } from './prisma.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class PrismaModule {}
