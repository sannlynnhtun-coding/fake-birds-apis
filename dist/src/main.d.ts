import { NestExpressApplication } from '@nestjs/platform-express';
declare function createApp(): Promise<NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>>;
export { createApp };
