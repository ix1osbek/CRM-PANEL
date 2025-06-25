import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  paymentType: string;

  @IsString()
  studentId: string;
}
