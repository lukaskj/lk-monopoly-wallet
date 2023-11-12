import { ArgumentsHost, ExceptionFilter, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
export declare class ValidationErrorExceptionFilter extends ValidationPipe implements ExceptionFilter {
    private readonly logger;
    catch(exception: Array<ValidationError>, host: ArgumentsHost): void;
}
