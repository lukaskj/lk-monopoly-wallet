import type { Game, PaginatedData, PlayerBalance, Transaction } from "$lib/dto";

export type TGameData = {
  game: Game;
  players: PlayerBalance[];
  transactions: PaginatedData<Transaction>;
};
