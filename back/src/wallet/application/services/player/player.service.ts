import { isNullOrUndefined } from "@common/helpers/is-null-or-undefined";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Player } from "@prisma/client";
import { GameRepository, PlayerRepository } from "../../../infrastructure/repositories";
import { CreatePlayerDto } from "../../dto/create-player.dto";

@Injectable()
export class PlayerService {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly gameRepository: GameRepository,
  ) {}

  public async createPlayer(playerDto: CreatePlayerDto, gameId: number): Promise<Player> {
    const game = await this.gameRepository.findUnique({ where: { id: gameId } });

    if (isNullOrUndefined(game)) {
      throw new NotFoundException(`Game ${gameId} not found.`);
    }

    return await this.playerRepository.create({
      data: {
        name: playerDto.name,
        color: playerDto.color,
        gameId,
      },
    });
  }

  public async getPlayerById(id: number): Promise<Player> {
    const player = await this.playerRepository.findUnique({
      where: { id },
    });

    if (isNullOrUndefined(player)) {
      throw new NotFoundException("Player not found.");
    }

    return player;
  }
}
