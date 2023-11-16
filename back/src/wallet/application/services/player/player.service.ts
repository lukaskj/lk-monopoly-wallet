import { isNullOrUndefined } from "@common/helpers/is-null-or-undefined";
import { PrismaService } from "@database/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Player } from "@prisma/client";
import { CreatePlayerDto } from "../../dto/create-player.dto";

@Injectable()
export class PlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createPlayer(playerDto: CreatePlayerDto, gameId: number): Promise<Player> {
    return await this.prismaService.player.create({
      data: {
        name: playerDto.name,
        color: playerDto.color,
        gameId,
      },
    });
  }

  public async getPlayerById(id: number): Promise<Player> {
    const player = await this.prismaService.player.findUnique({
      where: { id },
    });

    if (isNullOrUndefined(player)) {
      throw new NotFoundException("Player not found.");
    }

    return player;
  }
}
