import { IsDefined, IsEnum, IsNumber } from "class-validator";
import { TransactionOperation } from "../../../domain/enums/transaction-operation.enum";

export class AddTransactionViewModel {
  @IsDefined()
  @IsNumber()
  amount!: number;

  @IsDefined()
  @IsEnum(TransactionOperation)
  operation!: TransactionOperation;
}
