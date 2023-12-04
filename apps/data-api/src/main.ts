// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import { Logger, ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import {
//   // AllExceptionsFilter,
//   // HttpExceptionFilter,
//   ApiResponseInterceptor,
// } from '@avans-project-cswp/backend/dto';
// import { AppModule } from './app/app.module';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);

//   const corsOptions: CorsOptions = {};
//   app.enableCors(corsOptions);

//   app.useGlobalInterceptors(new ApiResponseInterceptor());
//   app.useGlobalPipes(new ValidationPipe());

//   // General exception handling
//   // app.useGlobalFilters(new HttpExceptionFilter());

//   const port = process.env.PORT || 3000;
//   await app.listen(port);
//   Logger.log(
//     `🚀 DATA-API server is running on: http://localhost:${port}/${globalPrefix}`
//   );
// }

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiResponseInterceptor } from '@avans-project-cswp/backend/dto';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {
    origin: true, // Allow any origin during development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 DATA-API server is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
