import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://cloudpad-vuejs.s3-website-ap-southeast-1.amazonaws.com'] })
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
