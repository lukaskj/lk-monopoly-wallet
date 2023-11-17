import { RealIP } from "@common/decorators/real-ip.decorator";
import { SerializeTo } from "@common/decorators/serialize-to";
import { Pagination } from "@common/pagination/pagination";
import { NotEmptyPipe } from "@common/pipes/not-empty.pipe";
import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { GameService } from "../../../application/services/game/game.service";
import { PlayerService } from "../../../application/services/player/player.service";
import { TransactionService } from "../../../application/services/transaction/transaction.service";
import { GameViewModel } from "../../viewmodels/game/game.viewmodel";
import { PlayerViewModel } from "../../viewmodels/game/player.viewmodel";
import { CreateGamePlayerViewmodel } from "../../viewmodels/game/request/create-game-player.viewmodel";
import { CreateGameViewmodel } from "../../viewmodels/game/request/create-game.viewmodel";
import { FilterGameViewmodel } from "../../viewmodels/game/request/filter-game.viewmodel";

@Controller("/v1/game")
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
    private readonly transactionService: TransactionService,
  ) {
    this.gameService;
  }

  @Get("")
  public async listGames(@Query() params: FilterGameViewmodel) {
    const [list, total] = await this.gameService.listGames(params);
    return Pagination.transformAndPaginate(GameViewModel, list, params.page, params.limit, total);
  }

  @Get(":id")
  @SerializeTo(GameViewModel)
  public async getGame(@Param("id", NotEmptyPipe, ParseIntPipe) id: number) {
    return await this.gameService.getGameById(id);
  }

  @Post("")
  @SerializeTo(GameViewModel)
  public async createGame(@Body() body: CreateGameViewmodel, @RealIP() ip: string) {
    const game = await this.gameService.createGame({
      ...body,
      creatorIp: ip,
    });
    return game;
  }

  @Post(":id/finish")
  @SerializeTo(GameViewModel)
  public async finishGame(@Param("id") id: number) {
    return await this.gameService.finishGame(id);
  }

  @Post(":id/player")
  @SerializeTo(PlayerViewModel)
  public async addNewPlayerToGame(@Param("id") id: number, @Body() body: CreateGamePlayerViewmodel) {
    return await this.playerService.createPlayer(
      {
        ...body,
      },
      id,
    );
  }

  @Delete(":id")
  public async deleteGame(@Param("id") id: number, @Headers("Authorization") password: string = "") {
    return await this.gameService.deleteGame(id, password);
  }
}
