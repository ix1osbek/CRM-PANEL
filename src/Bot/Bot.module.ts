import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './Bot.service';
import { TelegramController } from './Bot.controller'; 
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
  ],
  providers: [BotService],
  exports: [BotService],
  controllers: [TelegramController], 
})
export class TelegramModule {}