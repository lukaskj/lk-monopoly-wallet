import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import "./common/bigint-transform-fix";
import { ValidationErrorExceptionFilter } from "./common/filters/validation-error-exception-filter";
import { LoggingInterceptor } from "./common/interceptors/logging-interceptor";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ValidationErrorExceptionFilter());
  app.useGlobalInterceptors(
    // new HideSensitiveInformationInterceptor(),
    new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {}),
  );
  await app.listen(3000);
}
bootstrap();
