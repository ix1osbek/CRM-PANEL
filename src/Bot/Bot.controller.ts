import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { BotService } from './Bot.service'
export interface Complaint {
  id: string
  status: string
}

@Controller('complaints')
export class TelegramController {
  constructor(private readonly telegramService: BotService) {}

  @Get()
  async getAll(): Promise<Complaint[]> {
    return this.telegramService.getComplaints();
  }
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Complaint> {
    return this.telegramService.updateComplaintStatus(id, status);
  }
}