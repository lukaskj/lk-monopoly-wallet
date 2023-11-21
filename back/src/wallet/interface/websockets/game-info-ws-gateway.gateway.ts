import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { plainToInstance } from "class-transformer";
import { Server } from "socket.io";
import { TransactionAddedEvent } from "../../application/events/transaction-added.event";
import { UpdatePlayersBalanceEvent } from "../../application/events/update-players-balance.event";
import { GameRepository } from "../../infrastructure/repositories";
import { TransactionViewModel } from "../viewmodels/game/transaction.viewmodel";
import { PlayerBalanceViewModel } from "../viewmodels/game/player-balance.viewmodel";

@WebSocketGateway()
export class GameInfoWsGatewayGateway {
  @WebSocketServer() private server!: Server;

  constructor(private readonly gameRepository: GameRepository) {}

  @OnEvent(TransactionAddedEvent.NAME)
  async sendNewTransactionData(payload: TransactionAddedEvent): Promise<void> {
    const viewModel = plainToInstance(TransactionViewModel, payload.transaction, {
      excludeExtraneousValues: true,
    });

    this.server.emit(TransactionAddedEvent.NAME, viewModel);
  }

  @OnEvent(UpdatePlayersBalanceEvent.NAME)
  async sendPlayerBalances(payload: UpdatePlayersBalanceEvent): Promise<void> {
    const playerBalances = await this.gameRepository.gamePlayersBalance(payload.gameId);

    console.log("ASAAAAAAAAAAAA", { playerBalances, payload });
    console.log("ASAAAAAAAAAAAA", { playerBalances, payload });
    console.log("ASAAAAAAAAAAAA", { playerBalances, payload });
    console.log("ASAAAAAAAAAAAA", { playerBalances, payload });
    console.log("ASAAAAAAAAAAAA", { playerBalances, payload });

    const viewModel = plainToInstance(PlayerBalanceViewModel, playerBalances, {
      excludeExtraneousValues: true,
    });

    this.server.emit(UpdatePlayersBalanceEvent.NAME, viewModel);
  }
}
