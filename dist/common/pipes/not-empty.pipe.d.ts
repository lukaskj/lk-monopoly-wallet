import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class NotEmptyPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
