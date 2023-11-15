import { PaginationOptions } from "@common/pagination/pagination-options";

export class FilterGameDto extends PaginationOptions {
  id?: number;

  name?: string;

  finished?: boolean;
}
