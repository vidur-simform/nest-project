import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as morgan from 'morgan';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['randomkey']
  }))
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  // app.use(morgan('dev'));
  const config = new DocumentBuilder()
  .setTitle('Car Report App')
  .setDescription('The car report API description')
  .setVersion('1.0')
  .addTag('cars')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
} 
bootstrap();
