import { isNullOrEmptyOrUndefined } from "@common/helpers/is-null-or-undefined";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Prisma, Transaction } from "@prisma/client";
import { TransactionRepository } from "../../../infrastructure/repositories";
import { CreateTransactionDto } from "../../dto/create-transaction.dto";
import { FilterTransactionsDto } from "../../dto/filter-transactions.dto";
import { TransactionAddedEvent } from "../../events/transaction-added.event";
import { UpdatePlayersBalanceEvent } from "../../events/update-players-balance.event";
import { GameService } from "../game/game.service";
import { PlayerService } from "../player/player.service";

@Injectable()
export class TransactionService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly gameService: GameService,
    private readonly transactionRepository: TransactionRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  public async addPlayerTransaction(data: CreateTransactionDto, playerId: number, ip?: string): Promise<Transaction> {
    const transaction = (await this.transactionRepository.create({
      data: {
        amount: data.amount,
        operation: data.operation,
        playerId,
        ip,
      },
      include: {
        player: true,
      },
    })) as Prisma.TransactionGetPayload<{ include: { player: true } }>;

    this.eventEmitter.emitAsync(
      TransactionAddedEvent.NAME,
      new TransactionAddedEvent(transaction, transaction.player.gameId),
    );
    this.eventEmitter.emitAsync(
      UpdatePlayersBalanceEvent.NAME,
      new UpdatePlayersBalanceEvent(transaction.player.gameId),
    );

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

    if (!isNullOrEmptyOrUndefined(game.password) && game.password !== password) {
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
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = this.transactionRepository.count({
      where,
    });

    return Promise.all([transactions, count]);
  }
}
