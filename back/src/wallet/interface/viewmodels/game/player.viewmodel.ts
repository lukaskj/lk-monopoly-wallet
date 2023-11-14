import { Expose } from "class-transformer";

@Expose()
export class PlayerViewModel {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  color!: string;
}
