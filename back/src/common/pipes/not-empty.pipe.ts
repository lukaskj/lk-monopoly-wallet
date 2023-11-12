/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isNullOrEmptyOrUndefined } from "../helpers/is-null-or-undefined";

export class NotEmptyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (isNullOrEmptyOrUndefined(value)) {
      throw new BadRequestException(`${metadata.data} should not be empty`);
    }

    return value;
  }
}
