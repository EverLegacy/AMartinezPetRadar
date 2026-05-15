import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as appInsights from 'applicationinsights';

import { AppModule } from './app.module';
import { envs } from './config/envs';

// Azure Application Insights
appInsights
  .setup(envs.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .start();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(envs.PORT);
}

bootstrap();