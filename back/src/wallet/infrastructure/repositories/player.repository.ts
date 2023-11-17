import { PrismaService } from "@database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlayerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    params: Parameters<typeof this.prismaService.player.create>[0],
  ): ReturnType<typeof this.prismaService.player.create> {
    return this.prismaService.player.create(params);
  }

  public findFirst(
    params: Parameters<typeof this.prismaService.player.findFirst>[0],
  ): ReturnType<typeof this.prismaService.player.findFirst> {
    return this.prismaService.player.findFirst(params);
  }

  public findUnique(
    params: Parameters<typeof this.prismaService.player.findUnique>[0],
  ): ReturnType<typeof this.prismaService.player.findUnique> {
    return this.prismaService.player.findUnique(params);
  }

  public findMany(
    params: Parameters<typeof this.prismaService.player.findMany>[0],
  ): ReturnType<typeof this.prismaService.player.findMany> {
    return this.prismaService.player.findMany(params);
  }

  public count(
    params: Parameters<typeof this.prismaService.player.count>[0],
  ): ReturnType<typeof this.prismaService.player.count> {
    return this.prismaService.player.count(params);
  }

  public update(
    params: Parameters<typeof this.prismaService.player.update>[0],
  ): ReturnType<typeof this.prismaService.player.update> {
    return this.prismaService.player.update(params);
  }

  public delete(
    params: Parameters<typeof this.prismaService.player.delete>[0],
  ): ReturnType<typeof this.prismaService.player.delete> {
    return this.prismaService.player.delete(params);
  }

  public deleteMany(
    params: Parameters<typeof this.prismaService.player.deleteMany>[0],
  ): ReturnType<typeof this.prismaService.player.deleteMany> {
    return this.prismaService.player.deleteMany(params);
  }
}
