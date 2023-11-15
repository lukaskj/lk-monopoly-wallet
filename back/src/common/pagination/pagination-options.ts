import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationOptions {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  public readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  @IsOptional()
  public readonly limit: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  constructor(page: number = 1, limit: number = 10) {
    this.page = page;
    this.limit = limit;
  }
}
