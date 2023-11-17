import { Expose, Type } from "class-transformer";
import { PlayerViewModel } from "./player.viewmodel";

@Expose()
export class GameViewModel {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  finished!: boolean;

  @Expose()
  @Type(() => PlayerViewModel)
  players!: PlayerViewModel[];

  @Expose()
  createdAt!: Date;
}

// const a: Game;
//    ^?
