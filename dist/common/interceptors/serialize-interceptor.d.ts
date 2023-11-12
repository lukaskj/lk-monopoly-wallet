import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { ClassConstructor } from "../types";
export declare class SerializeInterceptor<T> implements NestInterceptor {
    private serializeTo;
    constructor(serializeTo: ClassConstructor<T>);
    intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
