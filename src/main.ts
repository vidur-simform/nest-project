import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['randomkey']
  }))
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  // app.use(morgan('dev'));
  await app.listen(3000);
} 
bootstrap();
