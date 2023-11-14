import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module";
import "./common/bigint-transform-fix";
import { LoggingInterceptor } from "./common/interceptors/logging-interceptor";

async function bootstrap(): Promise<void> {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // const validationExceptionPipeFilter = new ValidationErrorExceptionFilter();
  // app.useGlobalPipes(validationExceptionPipeFilter);
  // app.useGlobalFilters(validationExceptionPipeFilter);

  app.useGlobalInterceptors(
    // new HideSensitiveInformationInterceptor(),
    new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {}),
  );
  await app.listen(3000);
}
bootstrap();
