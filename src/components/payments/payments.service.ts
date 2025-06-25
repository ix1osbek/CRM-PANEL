import { Injectable, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../prisma/prisma.service'
import { CreateTransactionDto } from './dto/CreateTransaction.dto'
import { EditTransactionDto } from './dto/updatePayment.dto'

@Injectable()
export class TransactionService {
  constructor(private readonly db: DatabaseService) {}

  async create(payload: CreateTransactionDto) {
    return this.db.payment.create({
      data: payload,
    })
  }

  async findAll() {
    return this.db.payment.findMany({
      include: {
        student: true,
      },
    })
  }

  async findOne(transactionId: string) {
    const transaction = await this.db.payment.findUnique({
      where: { id: transactionId },
      include: { student: true },
    })

    if (!transaction) {
      throw new NotFoundException('Transaction not found')
    }

    return transaction
  }

  async update(transactionId: string, input: EditTransactionDto) {
    await this.findOne(transactionId) 
    return this.db.payment.update({
      where: { id: transactionId },
      data: input,
    })
  }

  async remove(transactionId: string) {
    await this.findOne(transactionId)
    return this.db.payment.delete({
      where: { id: transactionId },
    })
  }
}
