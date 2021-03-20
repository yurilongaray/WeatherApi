import { NestFactory } from '@nestjs/core';
import { getConnectionManager } from 'typeorm';
import { AppModule } from './src/app.module';
import { MongoConnectionService } from './src/connections/mongo.connection';

async function bootstrap() {

  await new MongoConnectionService().connect();

  console.info('Active Connections', getConnectionManager());

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(8000);
}

bootstrap();