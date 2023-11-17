import { isNullOrUndefined } from "@common/helpers/is-null-or-undefined";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Player } from "@prisma/client";
import { PlayerRepository } from "../../../infrastructure/repositories";
import { CreatePlayerDto } from "../../dto/create-player.dto";

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  public async createPlayer(playerDto: CreatePlayerDto, gameId: number): Promise<Player> {
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
