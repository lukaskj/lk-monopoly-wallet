import { faker } from "@faker-js/faker";
import { Transaction } from "@prisma/client";
import { TransactionOperation } from "../../src/wallet/domain/enums/transaction-operation.enum";

export function _fixtureTransaction(data?: Partial<Transaction>): Transaction {
  return {
    id: faker.number.int(),
    amount: faker.number.int(),
    ip: faker.internet.ip(),
    operation: faker.helpers.enumValue(TransactionOperation),
    playerId: faker.number.int(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    ...data,
  };
}
