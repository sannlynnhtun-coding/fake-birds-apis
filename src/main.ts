import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Response } from 'express';

let cachedApp: NestExpressApplication;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files from public directory
  // Handle both local development and serverless environments
  const publicPath = process.env.NODE_ENV === 'production' 
    ? join(process.cwd(), 'public')
    : join(__dirname, '..', 'public');
  app.useStaticAssets(publicPath, {
    prefix: '/public/',
  });
  
  app.enableCors(); // Enable CORS for API access
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Birds API')
    .setDescription('NestJS CRUD API for Birds Data with JWT Authentication')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('birds', 'Birds CRUD operations')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

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
  console.log(`  - Auth: http://localhost:${port}/auth/login`);
  console.log(`  - Birds: http://localhost:${port}/birds`);
}

// Only bootstrap if not in serverless environment
if (require.main === module) {
  bootstrap();
}

export { createApp };
