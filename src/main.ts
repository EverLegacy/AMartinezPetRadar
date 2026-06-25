import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as appInsights from 'applicationinsights';

import { AppModule } from './app.module';
import { envs } from './config/envs';
import { dataSource } from './core/db/data-source';

// Azure Application Insights
appInsights
  .setup(envs.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .start();

async function runMigrations() {
  try {
    console.log('Running pending migrations...');
    await dataSource.initialize();
    const executed = await dataSource.runMigrations();
    console.log(`Migrations executed: ${executed.length}`);
    await dataSource.destroy();
  } catch (error) {
    console.error('MIGRATION ERROR:', error);
    process.exit(1);
  }
}

async function bootstrap() {
  await runMigrations();

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