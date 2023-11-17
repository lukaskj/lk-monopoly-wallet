import { Expose } from "class-transformer";

export class PlayerBalanceViewModel {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  color!: string;

  @Expose()
  balance!: number;
}
