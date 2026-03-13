import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Global Exception Filter (from Screenshot)
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply Global Interceptors (from Screenshot)
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor()
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
