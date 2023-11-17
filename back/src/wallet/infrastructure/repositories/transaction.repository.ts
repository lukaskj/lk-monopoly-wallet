import { PrismaService } from "@database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    params: Parameters<typeof this.prismaService.transaction.create>[0],
  ): ReturnType<typeof this.prismaService.transaction.create> {
    return this.prismaService.transaction.create(params);
  }

  public findFirst(
    params: Parameters<typeof this.prismaService.transaction.findFirst>[0],
  ): ReturnType<typeof this.prismaService.transaction.findFirst> {
    return this.prismaService.transaction.findFirst(params);
  }

  public findUnique(
    params: Parameters<typeof this.prismaService.transaction.findUnique>[0],
  ): ReturnType<typeof this.prismaService.transaction.findUnique> {
    return this.prismaService.transaction.findUnique(params);
  }

  public findMany(
    params: Parameters<typeof this.prismaService.transaction.findMany>[0],
  ): ReturnType<typeof this.prismaService.transaction.findMany> {
    return this.prismaService.transaction.findMany(params);
  }

  public count(
    params: Parameters<typeof this.prismaService.transaction.count>[0],
  ): ReturnType<typeof this.prismaService.transaction.count> {
    return this.prismaService.transaction.count(params);
  }

  public update(
    params: Parameters<typeof this.prismaService.transaction.update>[0],
  ): ReturnType<typeof this.prismaService.transaction.update> {
    return this.prismaService.transaction.update(params);
  }

  public delete(
    params: Parameters<typeof this.prismaService.transaction.delete>[0],
  ): ReturnType<typeof this.prismaService.transaction.delete> {
    return this.prismaService.transaction.delete(params);
  }

  public deleteMany(
    params: Parameters<typeof this.prismaService.transaction.deleteMany>[0],
  ): ReturnType<typeof this.prismaService.transaction.deleteMany> {
    return this.prismaService.transaction.deleteMany(params);
  }
}
