import { PrismaService } from "@database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GameRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    createGame: Parameters<typeof this.prismaService.game.create>[0],
  ): ReturnType<typeof this.prismaService.game.create> {
    return this.prismaService.game.create(createGame);
  }

  public findFirst(
    params: Parameters<typeof this.prismaService.game.findFirst>[0],
  ): ReturnType<typeof this.prismaService.game.findFirst> {
    return this.prismaService.game.findFirst(params);
  }

  public findUnique(
    params: Parameters<typeof this.prismaService.game.findUnique>[0],
  ): ReturnType<typeof this.prismaService.game.findUnique> {
    return this.prismaService.game.findUnique(params);
  }

  public findMany(
    params: Parameters<typeof this.prismaService.game.findMany>[0],
  ): ReturnType<typeof this.prismaService.game.findMany> {
    return this.prismaService.game.findMany(params);
  }

  public count(
    params: Parameters<typeof this.prismaService.game.count>[0],
  ): ReturnType<typeof this.prismaService.game.count> {
    return this.prismaService.game.count(params);
  }

  public update(
    params: Parameters<typeof this.prismaService.game.update>[0],
  ): ReturnType<typeof this.prismaService.game.update> {
    return this.prismaService.game.update(params);
  }

  public delete(
    params: Parameters<typeof this.prismaService.game.delete>[0],
  ): ReturnType<typeof this.prismaService.game.delete> {
    return this.prismaService.game.delete(params);
  }
}
