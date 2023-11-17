import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../../../infrastructure/repositories";
import { CreateTransactionDto } from "../../dto/create-transaction.dto";
import { GameService } from "../game/game.service";
import { PlayerService } from "../player/player.service";
import { FilterTransactionsDto } from "../../dto/filter-transactions.dto";

@Injectable()
export class TransactionService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly gameService: GameService,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async addPlayerTransaction(data: CreateTransactionDto, playerId: number, ip?: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.create({
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

  public async listTransactions({
    skip,
    limit: take,
    gameId,
  }: FilterTransactionsDto): Promise<[Transaction[], number]> {
    const where = {
      player: {
        gameId,
      },
    };

    const transactions = this.transactionRepository.findMany({
      where,
      skip,
      take,
      include: {
        player: true,
      },
    });

    const count = this.transactionRepository.count({
      where,
    });

    return Promise.all([transactions, count]);
  }
}
