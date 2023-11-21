import { isNullOrEmptyOrUndefined, isNullOrUndefined } from "@common/helpers/is-null-or-undefined";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Game, Prisma } from "@prisma/client";
import { TransactionOperation } from "../../../domain/enums/transaction-operation.enum";
import { GameRepository, PlayerRepository, TransactionRepository } from "../../../infrastructure/repositories";
import { CreateGameDto } from "../../dto/create-game.dto";
import { FilterGameDto } from "../../dto/filter-game.dto";
import { PlayerService } from "../player/player.service";
import { PlayerBalance } from "../../../domain/entities/player-balance";

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly playerService: PlayerService,
  ) {}

  public async createGame(createGame: CreateGameDto): Promise<Game> {
    if (createGame.players.length < 2) {
      throw new BadRequestException("Minimum players: 2");
    }

    const game = await this.gameRepository.create({
      data: {
        name: createGame.name,
        password: createGame.password,
        creatorIp: createGame.creatorIp,
        initialAmount: createGame.initialAmount,
      },
    });

    for (const pl of createGame.players) {
      const player = await this.playerService.createPlayer(pl, game.id);
      await this.transactionRepository.create({
        data: {
          amount: createGame.initialAmount,
          operation: TransactionOperation.CREDIT,
          playerId: player.id,
          ip: createGame.creatorIp,
        },
      });
    }

    return (await this.gameRepository.findFirst({
      where: {
        id: game.id,
      },
      include: {
        players: true,
      },
    })) as Game;
  }

  public async getGameById(id: number): Promise<Game> {
    const game = await this.gameRepository.findUnique({
      where: {
        id,
      },
      include: {
        players: true,
      },
    });

    if (isNullOrUndefined(game)) {
      throw new NotFoundException("Game not found.");
    }

    return game;
  }

  public async listGames({ skip, limit: take, name, finished, id }: FilterGameDto): Promise<[Game[], number]> {
    const where: Prisma.GameWhereInput = {};

    if (!isNullOrUndefined(id)) {
      where.id = id;
    }

    if (!isNullOrEmptyOrUndefined(name)) {
      where.name = {
        contains: name.toLowerCase(),
      };
    }

    if (!isNullOrUndefined(finished)) {
      where.finished = finished;
    }

    const games = this.gameRepository.findMany({
      where,
      include: {
        players: true,
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = this.gameRepository.count({
      where,
    });

    return await Promise.all([games, total]);
  }

  public async finishGame(id: number, password?: string): Promise<Game> {
    const game = await this.getGameById(id);

    if (!isNullOrEmptyOrUndefined(game.password) && game.password !== password) {
      throw new UnauthorizedException("Wrong password");
    }

    return await this.gameRepository.update({
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
    const game = await this.gameRepository.findUnique({ where: { id } });
    if (isNullOrUndefined(game)) {
      return;
    }

    if (game.password !== null && game.password.trim() !== password?.trim()) {
      throw new UnauthorizedException();
    }

    await this.transactionRepository.deleteMany({
      where: {
        player: {
          gameId: id,
        },
      },
    });

    await this.playerRepository.deleteMany({
      where: {
        gameId: id,
      },
    });

    await this.gameRepository.delete({ where: { id } });
  }

  public async playersBalance(gameId: number): Promise<PlayerBalance[]> {
    return await this.gameRepository.gamePlayersBalance(gameId);
  }
}
