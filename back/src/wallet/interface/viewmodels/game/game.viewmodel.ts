import { Expose } from "class-transformer";

@Expose()
export class GameViewModel {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  finished!: boolean;
}

// const a: Game;
//    ^?
