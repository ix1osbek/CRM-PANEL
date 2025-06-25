import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  getGroupDetails(groupId: string) {
    throw new Error('Method not implemented.');
  }
  getTotalPayments() {
    throw new Error('Method not implemented.');
  }
  getStudentCount: any;
  constructor(private readonly db: DatabaseService) {}

  getStudentStats() {
    return this.db.student.count();
  }

  calculateTransactionSum() {
    return this.db.payment.aggregate({
      _sum: { amount: true },
    });
  }

  getClassInsight(classId: string) {
    return this.db.group.findUnique({
      where: { id: classId },
      include: {
        students: true,
      },
    });
  }
}
