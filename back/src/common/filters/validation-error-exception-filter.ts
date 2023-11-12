import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

@Catch(Array<ValidationError>)
export class ValidationErrorExceptionFilter extends ValidationPipe implements ExceptionFilter {
  private readonly logger: Logger = new Logger(ValidationErrorExceptionFilter.name);

  catch(exception: Array<ValidationError>, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = HttpStatus.BAD_REQUEST;
    const message = this.flattenValidationErrors(exception);
    const error = "Bad Request";

    const json = {
      statusCode,
      message,
      error,
    };

    this.logger.error([json, exception]);

    response.status(statusCode).json(json);
  }
}
