import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { join } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

let cachedApp: NestExpressApplication;

/**
 * Creates the shared Nest application used locally and by Vercel.
 * @returns The initialized Nest Express application.
 */
async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable API versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger configuration for v1 and v2
  const config = new DocumentBuilder()
    .setTitle('Birds API')
    .setDescription(
      'REST API for Birds Data - v1 (No Auth) and v2 (JWT Auth Required)',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token (Required for v2 endpoints)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const { apiReference } = await import('@scalar/nestjs-api-reference');
  app.use(
    '/scalar',
    apiReference({
      content: document,
    }),
  );
  SwaggerModule.setup('', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js',
    ],
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.enableCors(); // Enable CORS for API access

  await app.init();
  cachedApp = app;
  return app;
}

async function bootstrap() {
  const app = await createApp();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/`);
  console.log(`Scalar documentation: http://localhost:${port}/scalar`);
  console.log(`API endpoints:`);
  console.log(`  - Auth: http://localhost:${port}/api/auth/login`);
  console.log(`  - Birds v1 (No Auth): http://localhost:${port}/api/v1/birds`);
  console.log(
    `  - Birds v2 (Auth Required): http://localhost:${port}/api/v2/birds`,
  );
}

if (require.main === module) {
  void bootstrap();
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const app = await createApp();
  app.getHttpAdapter().getInstance()(req, res);
}

export { createApp };
