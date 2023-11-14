import { RealIP } from "@common/decorators/real-ip.decorator";
import { SerializeTo } from "@common/decorators/serialize-to";
import { NotEmptyPipe } from "@common/pipes/not-empty.pipe";
import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { GameService } from "../../../application/services/game/game.service";
import { GameViewModel } from "../../viewmodels/game/game.viewmodel";
import { CreateGameViewmodel } from "../../viewmodels/game/request/create-game.viewmodel";

@Controller("/v1/game")
export class GameController {
  constructor(private readonly gameService: GameService) {
    this.gameService;
  }

  @Get(":id")
  @SerializeTo(GameViewModel)
  public async getGame(@Param("id", NotEmptyPipe, ParseIntPipe) id: number): Promise<object> {
    return await this.gameService.getGameById(id);
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
