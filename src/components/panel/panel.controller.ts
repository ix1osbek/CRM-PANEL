import { Controller, Get } from '@nestjs/common';
import { PanelService } from './panel.service';

@Controller('overview')
export class OverviewController {
  constructor(private readonly overviewService: PanelService) {}

  @Get('summary')
  loadOverviewData() {
    return this.overviewService.getSummary();
  }
}
