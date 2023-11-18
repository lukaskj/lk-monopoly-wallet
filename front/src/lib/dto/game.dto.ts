import { Type } from "class-transformer";
import type { Player } from "./player.dto";

export class Game {
  id!: number;
  name!: string;
  finished!: boolean;

  @Type(() => Date)
  createdAt!: Date;

  players!: Player[];
}
