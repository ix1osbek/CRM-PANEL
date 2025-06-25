import { PartialType } from '@nestjs/mapped-types'
import { CreateTransactionDto } from './CreateTransaction.dto'

export class EditTransactionDto extends PartialType(CreateTransactionDto) {}
