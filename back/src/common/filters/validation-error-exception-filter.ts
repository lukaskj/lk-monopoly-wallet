import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";

@Catch()
export class ValidationErrorExceptionFilter extends ValidationPipe implements ExceptionFilter {
  // private readonly logger: Logger = new Logger(ValidationErrorExceptionFilter.name);

  constructor() {
    super({
      transform: true,
      stopAtFirstError: true,
    });
  }

  protected exceptionFactory = (errors: ValidationError[]): any => {
    const result = errors.map((error) => ({
      property: error.property,
      message: error.constraints ? error.constraints[Object.keys(error.constraints)[0]] : "",
    }));

    return new BadRequestException(result);
  };

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const exResponse = exception.getResponse();
      const error = exception.name;
      let message = "";
      if (typeof exResponse === "object" && "message" in exResponse) {
        message = exResponse.message as string;
      }
      const statusCode = exception.getStatus();
      // const error = exception.message;
      console.log({
        statusCode,
        exception,
        exResponse,
        message,
      });

      response.status(statusCode).json({
        statusCode,
        message: error,
      });
    }
    // const statusCode = HttpStatus.BAD_REQUEST;
    // const message = this.flattenValidationErrors(exception);
    // const error = "Bad Request";

    // const json = {
    //   statusCode,
    //   message,
    //   error,
    // };

    // this.logger.error([json, exception]);

    // response.status(500).json({});
  }
}
