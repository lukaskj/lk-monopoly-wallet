import { Module } from "@nestjs/common";
import { GameController } from "./interface/controllers/game/game.controller";
import { GameService } from "./application/services/game/game.service";

@Module({
  controllers: [GameController],
  providers: [GameService],
})
export class WalletModule {}
