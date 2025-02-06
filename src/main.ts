import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { AppModule } from './modules/app.module';
import { CustomExceptionFilter } from './utilities/custom-exception-filter';

/**
 * @description this is where the app boots from
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['error', 'warn', 'log', 'debug']
        : ['error', 'warn', 'log'],
  });
  const allowList = process.env.CORS_ORIGINS || [];

  const { httpAdapter } = app.get(HttpAdapterHost);
  const logger: Logger = app.get(Logger);
  app.useGlobalFilters(new CustomExceptionFilter(httpAdapter, logger));
  app.enableCors((req, cb) => {
    const options = {
      credentials: true,
      origin: false,
    };

    if (allowList.indexOf(req.header('Origin')) !== -1) {
      options.origin = true;
    }
    cb(null, options);
  });
  app.use(json({ limit: '50mb' }));
  const config = new DocumentBuilder()
    .setTitle('Compact API')
    .setDescription('A Compact API Template')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Add passkey as an optional header to all endpoints
  Object.values(document.paths).forEach((path) => {
    Object.values(path).forEach((method) => {
      method.parameters = [
        ...(method.parameters || []),
        {
          in: 'header',
          name: 'passkey',
          description: 'Pass key',
          required: false,
        },
      ];
    });
  });
  SwaggerModule.setup('api', app, document);
  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
