import { Injectable } from "@nestjs/common";
import { PrismaService } from "@database/prisma.service";
import { CreateGameDto } from "../../dto/create-game.dto";
import { Game } from "@prisma/client";

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createGame(createGame: CreateGameDto): Promise<Game> {
    const game = await this.prismaService.game.create({
      data: {
        name: createGame.name,
        password: createGame.password,
        creatorIp: createGame.creatorIp,
        initialAmount: createGame.initialAmount,
      },
    });

    return game;
  }
}
