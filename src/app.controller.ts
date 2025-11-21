import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getIndex(@Res() res: Response) {
    // Always look for public folder at project root
    // In development: __dirname is dist/src, so go up two levels to project root
    // In production: process.cwd() is project root
    const projectRoot = process.env.NODE_ENV === 'production'
      ? process.cwd()
      : join(__dirname, '..', '..');
    const indexPath = join(projectRoot, 'public', 'index.html');
    res.sendFile(indexPath);
  }
}
