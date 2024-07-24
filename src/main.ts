import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorHandle } from './filter/custom.exetepsion.filter';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { swaggerConfig } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandle());
  app.setGlobalPrefix('api/v1');

  const config = app.get(ConfigService);
  const host = config.getOrThrow<string>('app.host');
  const port = config.getOrThrow<number>('app.port');

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, host);
}
bootstrap();
