import { RealIP } from "@common/decorators/real-ip.decorator";
import { Body, Controller, Post } from "@nestjs/common";
import { GameService } from "../../../application/services/game/game.service";
import { CreateGameViewmodel } from "../../viewmodels/game/request/create-game.viewmodel";
import { GameViewModel } from "../../viewmodels/game/game.viewmodel";
import { SerializeTo } from "@common/decorators/serialize-to";

@Controller("/v1/game")
export class GameController {
  constructor(private readonly gameService: GameService) {
    this.gameService;
  }

  @Post("")
  @SerializeTo(GameViewModel)
  public async createGame(@Body() body: CreateGameViewmodel, @RealIP() ip: string): Promise<object> {
    const game = await this.gameService.createGame({
      ...body,
      creatorIp: ip,
    });
    return game;
  }
}
