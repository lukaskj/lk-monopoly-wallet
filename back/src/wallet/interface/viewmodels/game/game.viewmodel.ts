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

  @Expose()
  hasPassword: boolean = false;
}

// const a: Game;
//    ^?
