import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'
import { TransactionService } from './payments.service'
import { CreateTransactionDto } from './dto/CreateTransaction.dto'
import { EditTransactionDto } from './dto/updatePayment.dto'

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('add')
  addTransaction(@Body() input: CreateTransactionDto) {
    return this.transactionService.create(input)
  }

  @Get('list')
  getAllTransactions() {
    return this.transactionService.findAll()
  }

  @Get('details/:id')
  getTransactionById(@Param('id') id: string) {
    return this.transactionService.findOne(id)
  }

  @Patch('update/:id')
  updateTransaction(
    @Param('id') id: string,
    @Body() input: EditTransactionDto,
  ) {
    return this.transactionService.update(id, input)
  }

  @Delete('delete/:id')
  deleteTransaction(@Param('id') id: string) {
    return this.transactionService.remove(id)
  }
}
