/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body, headers } = req;
    const nBody = { ...body };

    if ("password" in nBody) {
      nBody.password = null;
    }

    console.log("[-] Request ---------------------------");
    console.log({
      originalUrl,
      method,
      params,
      query,
      body: nBody,
      headers,
    });

    console.log("[-] Response ---------------------------");
    return next.handle().pipe(
      tap((data) =>
        console.log({
          statusCode,
          data,
        }),
      ),
    );
  }
}
