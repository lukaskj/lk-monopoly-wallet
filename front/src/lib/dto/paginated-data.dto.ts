import { Type } from "class-transformer";

export class PaginatedData<T> {
  public data!: T[];

  @Type(() => PaginationMetadata)
  public meta!: PaginationMetadata;
}

class PaginationMetadata {
  public hasNextPage!: boolean;
  public hasPreviousPage!: boolean;
  public limit!: number;
  public page!: number;
  public pageCount!: number;
  public total!: number;
}
