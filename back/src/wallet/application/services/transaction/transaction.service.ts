import { PrismaService } from "@database/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../../dto/create-transaction.dto";
import { GameService } from "../game/game.service";
import { PlayerService } from "../player/player.service";

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly playerService: PlayerService,
    private readonly gameService: GameService,
  ) {}

  public async addPlayerTransaction(data: CreateTransactionDto, playerId: number, ip?: string): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.create({
      data: {
        amount: data.amount,
        operation: data.operation,
        playerId,
        ip,
      },
    });

    return transaction;
  }

  public async addPlayerTransactionCheckingPassword(
    password: string,
    data: CreateTransactionDto,
    playerId: number,
    ip?: string,
  ): Promise<Transaction> {
    const player = await this.playerService.getPlayerById(playerId);

    const game = await this.gameService.getGameById(player.gameId);

    if (game.password !== password) {
      throw new UnauthorizedException("Wrong password.");
    }

    return await this.addPlayerTransaction(data, playerId, ip);
  }
}
