import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true });

  const validationOptions: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
  };

  app.useGlobalPipes(new ValidationPipe(validationOptions));


  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
