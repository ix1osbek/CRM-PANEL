import { Module } from '@nestjs/common';
import { TransactionService } from './payments.service';
import { TransactionController } from './payments.controller';
import { DatabaseService } from '../../prisma/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, DatabaseService],
})
export class TransactionModule {}
