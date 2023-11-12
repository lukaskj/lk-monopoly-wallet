/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { ClassConstructor } from "../types";

export class SerializeInterceptor<T> implements NestInterceptor {
  private serializeTo: ClassConstructor<T>;

  constructor(serializeTo: ClassConstructor<T>) {
    this.serializeTo = serializeTo;
  }

  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.serializeTo, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
