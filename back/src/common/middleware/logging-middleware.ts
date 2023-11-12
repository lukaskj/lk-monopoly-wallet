import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    // Gets the request log
    const headers = { ...req.headers };
    delete headers.authorization;
    delete headers.cookie;
    console.log("---------------------------");
    console.log(`req:`, {
      headers: headers,
      body: req.body,
      originalUrl: req.originalUrl,
    });
    console.log("---------------------------");
    // Ends middleware function execution, hence allowing to move on
    if (next) {
      next();
    }
  }
}
