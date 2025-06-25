import { Module } from '@nestjs/common';
import { OverviewController } from './panel.controller';
import { PanelService } from './panel.service';
import { DatabaseService } from '../../prisma/prisma.service';

@Module({
  controllers: [OverviewController],
  providers: [PanelService, DatabaseService],
})
export class PanelModule {}
