"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
let cachedApp;
async function createApp() {
    if (cachedApp) {
        return cachedApp;
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const publicPath = process.env.NODE_ENV === 'production'
        ? (0, path_1.join)(process.cwd(), 'public')
        : (0, path_1.join)(__dirname, '..', 'public');
    app.useStaticAssets(publicPath, {
        prefix: '/public/',
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
    console.log(`API documentation: http://localhost:${port}/`);
    console.log(`API endpoints:`);
    console.log(`  - Auth: http://localhost:${port}/auth/login`);
    console.log(`  - Birds: http://localhost:${port}/birds`);
}
if (require.main === module) {
    bootstrap();
}
//# sourceMappingURL=main.js.map