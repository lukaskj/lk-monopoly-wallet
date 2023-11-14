import { CreatePlayerDto } from "./create-player.dto";

export class CreateGameDto {
  name?: string;
  password?: string;
  creatorIp?: string;
  initialAmount: number = 0;
  players!: CreatePlayerDto[];
}
