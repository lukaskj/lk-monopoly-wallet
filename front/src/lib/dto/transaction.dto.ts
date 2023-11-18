import type { TransactionOperation } from "../enums/transaction-operation.enum";
import type { Player } from "./player.dto";

export class Transaction {
  id!: number;
  amount!: number;
  operation!: TransactionOperation;
  player!: Player;
}
