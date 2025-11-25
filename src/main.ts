import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

let cachedApp: NestExpressApplication;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable API versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  
  // Swagger configuration for v1 and v2
  const config = new DocumentBuilder()
    .setTitle('Birds API')
    .setDescription('REST API for Birds Data - v1 (No Auth) and v2 (JWT Auth Required)')
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
  console.log(`API endpoints:`);
  console.log(`  - Auth: http://localhost:${port}/api/auth/login`);
  console.log(`  - Birds v1 (No Auth): http://localhost:${port}/api/v1/birds`);
  console.log(`  - Birds v2 (Auth Required): http://localhost:${port}/api/v2/birds`);
}

if (require.main === module) {
  bootstrap();
}

export { createApp };
