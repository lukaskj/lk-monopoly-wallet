import { plainToInstance } from "class-transformer";
import { AnyType, ClassConstructor } from "../types";
import { PaginationMetadata } from "./pagination-metadata";
import { PaginationOptions } from "./pagination-options";

export class Pagination<T> {
  public data: T[];
  public meta: PaginationMetadata;

  private constructor(data: T[], meta: PaginationMetadata) {
    this.data = data;
    this.meta = meta;
  }

  public static paginate<T>(data: T[], page: number = 1, limit: number = 10, total: number = 0): Pagination<T> {
    const paginationOptions = new PaginationOptions(page, limit);
    const paginationMetadata = new PaginationMetadata(paginationOptions, total);
    return new Pagination(data, paginationMetadata);
  }

  public static transformAndPaginate<T>(
    cls: ClassConstructor<T>,
    data: AnyType[],
    page: number = 1,
    limit: number = 10,
    total: number = 0,
  ): Pagination<T> {
    const transformedData = data.map((item) => plainToInstance(cls, item, { excludeExtraneousValues: true }));
    return this.paginate(transformedData, page, limit, total);
  }
}
