import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';

@Injectable()
export class PanelService {
  [x: string]: any;
  constructor(private readonly db: DatabaseService) {}

  async loadOverviewData() {
    const studentsCount = await this.db.student.count();
    const groupsCount = await this.db.group.count();
    const paymentsTotal = await this.db.payment.aggregate({
      _sum: { amount: true },
    });

    return {
      studentsCount,
      groupsCount,
      totalCollected: paymentsTotal._sum.amount || 0,
    };
  }
}
