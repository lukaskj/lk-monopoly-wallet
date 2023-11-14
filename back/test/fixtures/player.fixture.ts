import { faker } from "@faker-js/faker";
import { Player } from "@prisma/client";
import { CreatePlayerDto } from "../../src/wallet/application/dto/create-player.dto";

export function _fixturePlayer(data?: Partial<Player>): Player {
  return {
    id: faker.number.int(),
    color: faker.color.rgb(),
    gameId: faker.number.int(),
    name: faker.person.jobDescriptor(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    ...data,
  };
}

export function _fixtureCreatePlayerDto(data?: Partial<CreatePlayerDto>): CreatePlayerDto {
  return {
    color: faker.color.rgb(),
    name: faker.person.jobDescriptor(),
    ...data,
  };
}
