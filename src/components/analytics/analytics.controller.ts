import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('insights')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('students/total')
  fetchStudentStats() {
    return this.analyticsService.getStudentCount();
  }

  @Get('transactions/sum')
  calculateTotalTransactions() {
    return this.analyticsService.getTotalPayments();
  }

  @Get('class-info/:id')
  fetchGroupInsight(@Param('id') groupId: string) {
    return this.analyticsService.getGroupDetails(groupId);
  }
}
