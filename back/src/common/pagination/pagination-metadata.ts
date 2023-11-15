import { PaginationOptions } from "./pagination-options";

export class PaginationMetadata {
  public page: number;
  public limit: number;
  public total: number;
  public pageCount: number;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;

  constructor(paginationOptionsDto: PaginationOptions, total: number) {
    this.page = paginationOptionsDto.page;
    this.limit = paginationOptionsDto.limit;
    this.total = total;
    this.pageCount = Math.ceil(this.total / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
