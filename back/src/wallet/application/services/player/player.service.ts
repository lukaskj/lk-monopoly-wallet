import { Injectable } from "@nestjs/common";
import { CreatePlayerDto } from "../../dto/create-player.dto";
import { Player } from "@prisma/client";
import { PrismaService } from "@database/prisma.service";

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
}
