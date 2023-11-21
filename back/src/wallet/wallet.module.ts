import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { GameInfoWsGatewayGateway } from "./interface/websockets/game-info-ws-gateway.gateway";
import { GameService } from "./application/services/game/game.service";
import { PlayerService } from "./application/services/player/player.service";
import { TransactionService } from "./application/services/transaction/transaction.service";
import { GameRepository, PlayerRepository, TransactionRepository } from "./infrastructure/repositories";
import { GameTransactionsController } from "./interface/controllers/game/game-transactions.controller";
import { GameController } from "./interface/controllers/game/game.controller";
import { PlayerController } from "./interface/controllers/player/player.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GameController, GameTransactionsController, PlayerController],
  providers: [
    GameService,
    PlayerService,
    TransactionService,
    PlayerRepository,
    GameRepository,
    TransactionRepository,
    GameInfoWsGatewayGateway,
  ],
})
export class WalletModule {}
