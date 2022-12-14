/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { APP_NAME, APP_VERSION } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setBasePath(globalPrefix)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    // .addBearerAuth(
    //   {
    //     // I was also testing it without prefix 'Bearer ' before the JWT
    //     description: `[just text field] Please enter token in following format: Bareer <JWT>`,
    //     name: 'Authorization',
    //     bearerFormat: 'JWT', // I`ve tested not to use this field, but the result was the same
    //     scheme: 'Bearer',
    //     type: 'http', // I`ve attempted type: 'apiKey' too
    //     in: 'Header',
    //   },
    //   'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    // )
    // .addSecurityRequirements('access-token')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${globalPrefix}/swagger`, app, document);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
