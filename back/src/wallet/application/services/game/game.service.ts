import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "@database/prisma.service";
import { CreateGameDto } from "../../dto/create-game.dto";
import { Game } from "@prisma/client";
import { PlayerService } from "../player/player.service";
import { isNullOrUndefined } from "../../../../common/helpers/is-null-or-undefined";

@Injectable()
export class GameService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly playerService: PlayerService,
  ) {}

  public async createGame(createGame: CreateGameDto): Promise<Game> {
    if (createGame.players.length < 2) {
      throw new BadRequestException("Minimum players: 2");
    }

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

  public async getGameById(id: number): Promise<Game> {
    const game = await this.prismaService.game.findUnique({
      where: {
        id,
      },
    });

    if (isNullOrUndefined(game)) {
      throw new NotFoundException();
    }

    return game;
  }

  public async finishGame(id: number): Promise<Game> {
    return await this.prismaService.game.update({
      data: {
        finished: true,
      },
      where: {
        id,
      },
      include: {
        players: true,
      },
    });
  }

  public async deleteGame(id: number, password: string): Promise<void> {
    const game = await this.prismaService.game.findUnique({ where: { id } });
    if (isNullOrUndefined(game)) {
      return;
    }

    if (game.password?.trim() !== password.trim()) {
      throw new UnauthorizedException();
    }

    await this.prismaService.transaction.deleteMany({
      where: {
        player: {
          gameId: id,
        },
      },
    });

    await this.prismaService.player.deleteMany({
      where: {
        gameId: id,
      },
    });

    await this.prismaService.game.delete({ where: { id } });
  }
}
