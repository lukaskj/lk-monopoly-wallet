import { PaginationOptions } from "@common/pagination/pagination-options";

export class FilterTransactionsDto extends PaginationOptions {
  gameId!: number;
}
