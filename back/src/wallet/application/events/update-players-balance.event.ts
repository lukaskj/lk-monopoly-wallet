export class UpdatePlayersBalanceEvent {
  public static NAME = "update-players-balance";

  constructor(public gameId: number) {}
}
