import { BooleanTransform } from "@common/decorators/boolean-transform";
import { PaginationOptions } from "@common/pagination/pagination-options";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterGameViewmodel extends PaginationOptions {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @BooleanTransform()
  @IsOptional()
  @IsBoolean()
  finished?: boolean;
}
