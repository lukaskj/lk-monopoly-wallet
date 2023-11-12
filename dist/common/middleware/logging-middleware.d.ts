import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class LoggingMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: NextFunction): void;
}
