import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // CORS setup
  app.enableCors({
    origin: [process.env.FRONTEND_ORIGIN], 
    credentials: true,
  });

  // Global input validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Global JWT Auth Guard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
