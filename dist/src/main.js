"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
let cachedApp;
async function createApp() {
    if (cachedApp) {
        return cachedApp;
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Birds API')
        .setDescription('REST API for Birds Data - v1 (No Auth) and v2 (JWT Auth Required)')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token (Required for v2 endpoints)',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, document, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js',
        ],
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.enableCors();
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
//# sourceMappingURL=main.js.map