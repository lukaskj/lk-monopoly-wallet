import { Expose, Type } from "class-transformer";
import { PlayerViewModel } from "./player.viewmodel";

@Expose()
export class TransactionViewModel {
  @Expose()
  id!: number;

  @Expose()
  amount!: number;

  @Expose()
  operation!: number;

  @Expose()
  @Type(() => PlayerViewModel)
  player!: PlayerViewModel;
}
