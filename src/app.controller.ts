import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getIndex() {
    return {
      message: 'Birds API',
      description: 'REST API for Birds Data',
      versions: {
        v1: {
          path: '/api/v1/birds',
          auth: false,
          description: 'No authentication required',
        },
        v2: {
          path: '/api/v2/birds',
          auth: true,
          description: 'JWT authentication required',
        },
      },
      documentation: '/',
      auth: {
        login: '/api/auth/login',
      },
    };
  }
}
