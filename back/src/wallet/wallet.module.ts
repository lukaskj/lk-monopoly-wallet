import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { GameService } from "./application/services/game/game.service";
import { PlayerService } from "./application/services/player/player.service";
import { TransactionService } from "./application/services/transaction/transaction.service";
import { GameController } from "./interface/controllers/game/game.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [GameService, PlayerService, TransactionService],
})
export class WalletModule {}
