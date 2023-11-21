import { Transaction } from "@prisma/client";

export class TransactionAddedEvent {
  public static NAME = "transaction-added";

  constructor(public transaction: Transaction) {}
}
