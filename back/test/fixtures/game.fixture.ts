import { faker } from "@faker-js/faker";
import { Game, Prisma } from "@prisma/client";
import { CreateGameDto } from "../../src/wallet/application/dto/create-game.dto";

export function _fixtureGame(data?: Partial<Game>): Game {
  return {
    id: faker.number.int({ min: 1, max: 100000 }),
    name: faker.person.jobArea(),
    creatorIp: faker.internet.ip(),
    finished: faker.datatype.boolean(),
    initialAmount: Prisma.Decimal.sum(faker.number.int({ min: 100, max: 100000 })),
    password: faker.string.alphanumeric({ length: 5 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    ...data,
  };
}

export function _fixtureCreateGameDto(data?: Partial<CreateGameDto>): CreateGameDto {
  return {
    name: faker.person.jobArea(),
    creatorIp: faker.internet.ip(),
    initialAmount: faker.number.int({ min: 100, max: 100000 }),
    password: faker.string.alphanumeric({ length: 5 }),
    players: [],
    ...data,
  };
}
