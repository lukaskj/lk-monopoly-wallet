import { TransactionOperation } from "../../domain/enums/transaction-operation.enum";

export class CreateTransactionDto {
  amount!: number;
  operation!: TransactionOperation;
}
