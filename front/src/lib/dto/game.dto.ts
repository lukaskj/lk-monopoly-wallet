import { Type } from "class-transformer";
import { Player } from "./player.dto";

export class Game {
  id!: number;
  name!: string;
  finished!: boolean;
  hasPassword!: boolean;
  initialAmount!: number;

  @Type(() => Date)
  createdAt!: Date;

  @Type(() => Player)
  players!: Player[];
}
