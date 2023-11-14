import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { GameService } from "./application/services/game/game.service";
import { GameController } from "./interface/controllers/game/game.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [GameService],
})
export class WalletModule {}
