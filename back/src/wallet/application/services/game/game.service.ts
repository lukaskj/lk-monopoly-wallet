import { Injectable } from "@nestjs/common";
import { PrismaService } from "@database/prisma.service";
import { CreateGameDto } from "../../dto/create-game.dto";
import { Game } from "@prisma/client";
import { PlayerService } from "../player/player.service";

@Injectable()
export class GameService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly playerService: PlayerService,
  ) {}

  public async createGame(createGame: CreateGameDto): Promise<Game> {
    const game = await this.prismaService.game.create({
      data: {
        name: createGame.name,
        password: createGame.password,
        creatorIp: createGame.creatorIp,
        initialAmount: createGame.initialAmount,
      },
    });

    // const promises = [];
    for (const pl of createGame.players) {
      await this.playerService.createPlayer(pl, game.id);
    }
    // await Promise.allSettled(promises);

    return (await this.prismaService.game.findFirst({
      where: {
        id: game.id,
      },
      include: {
        players: true,
      },
    })) as Game;
  }
}
